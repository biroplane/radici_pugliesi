import type { H3Event } from 'h3'
import { Buffer } from 'node:buffer'
import { createHmac, timingSafeEqual } from 'node:crypto'
import process from 'node:process'
import { defineEventHandler, getHeader } from 'h3'
import { ofetch } from 'ofetch'

// Type definitions for Shopify webhook payloads
interface ShopifyProduct {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  handle: string
  images: Array<{ src: string }>
  variants: Array<{ id: number, title: string, price: string }>
  [key: string]: any
}

interface ShopifyCollection {
  id: number
  title: string
  handle: string
  body_html: string
  [key: string]: any
}

const PRISMIC_REPO_NAME = process.env.PRISMIC_REPO_NAME
const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET

const PRISMIC_API_URL = `https://${PRISMIC_REPO_NAME}.prismic.io/migration/documents` // Migration API endpoint

// --- Helper: Verify Shopify Webhook ---
async function verifyShopifyWebhook(event: H3Event): Promise<{ valid: boolean, rawBody: Buffer | null }> {
  const hmacHeader = getHeader(event, 'x-shopify-hmac-sha256')
  if (!hmacHeader || !SHOPIFY_WEBHOOK_SECRET)
    return { valid: false, rawBody: null }
  // Read raw body as Buffer (Nuxt 3/h3: use event.node.req for raw body)
  const chunks: Buffer[] = []
  for await (const chunk of event.node.req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  const rawBody = Buffer.concat(chunks)
  const digest = createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('base64')
  try {
    const valid = timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader))
    return { valid, rawBody }
  }
  catch {
    return { valid: false, rawBody }
  }
}

// --- Helper: Sync Product with Prismic ---
async function syncProductWithPrismic(product: ShopifyProduct): Promise<void> {
  const doc = {
    type: 'product',
    shopify_id: product.id,
    title: product.title,
    description: product.body_html,
    handle: product.handle,
    images: product.images?.map(img => img.src) || [],
    vendor: product.vendor,
    product_type: product.product_type,
    variants: product.variants,
  }
  try {
    await ofetch(PRISMIC_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${PRISMIC_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documents: [doc] }),
    })
    console.log(`[Prismic] Synced product ${product.id}`)
  }
  catch (err) {
    console.error(`[Prismic] Failed to sync product ${product.id}:`, err)
    throw err
  }
}

// --- Helper: Sync Category with Prismic ---
async function syncCategoryWithPrismic(category: ShopifyCollection): Promise<void> {
  const doc = {
    type: 'category',
    shopify_id: category.id,
    title: category.title,
    description: category.body_html,
    handle: category.handle,
  }
  try {
    await ofetch(PRISMIC_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${PRISMIC_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documents: [doc] }),
    })
    console.log(`[Prismic] Synced category ${category.id}`)
  }
  catch (err) {
    console.error(`[Prismic] Failed to sync category ${category.id}:`, err)
    throw err
  }
}

// --- Helper: Delete Prismic Document by Shopify ID ---
async function deletePrismicDocByShopifyId(id: number, type: 'product' | 'category'): Promise<void> {
  try {
    await ofetch(`${PRISMIC_API_URL}/delete`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${PRISMIC_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queries: [{ field: 'shopify_id', value: id, type }],
      }),
    })
    console.log(`[Prismic] Deleted ${type} ${id}`)
  }
  catch (err) {
    console.error(`[Prismic] Failed to delete ${type} ${id}:`, err)
    throw err
  }
}

// --- Main Handler ---
export default defineEventHandler(async (event) => {
  // Verify webhook and get raw body
  const { valid, rawBody } = await verifyShopifyWebhook(event)
  if (!valid || !rawBody) {
    console.error('[Shopify] Webhook signature invalid')
    event.node.res.statusCode = 401
    return { success: false, error: 'Invalid signature' }
  }

  const topic = getHeader(event, 'x-shopify-topic')
  // Parse JSON body from rawBody
  let body: any
  try {
    body = JSON.parse(rawBody.toString('utf8'))
  }
  catch (err) {
    console.error('[Shopify] Failed to parse webhook body:', err)
    event.node.res.statusCode = 400
    return { success: false, error: 'Invalid JSON body' }
  }

  try {
    if (topic?.startsWith('products/')) {
      if (topic.endsWith('delete')) {
        await deletePrismicDocByShopifyId(body.id, 'product')
      }
      else {
        await syncProductWithPrismic(body)
      }
    }
    else if (topic?.startsWith('collections/')) {
      if (topic.endsWith('delete')) {
        await deletePrismicDocByShopifyId(body.id, 'category')
      }
      else {
        await syncCategoryWithPrismic(body)
      }
    }
    else {
      console.log(`[Shopify] Unhandled topic: ${topic}`)
    }
    return { success: true }
  }
  catch (err) {
    event.node.res.statusCode = 500
    return { success: false, error: (err as Error).message }
  }
})
