import process from 'node:process'
import * as prismic from '@prismicio/client'
import { htmlAsRichText } from '@prismicio/migrate'

import 'dotenv/config'

const writeClient = prismic.createWriteClient('radici-pugliesi', {
  writeToken: process.env.PRISMIC_WRITE_TOKEN!,
})

const migration = prismic.createMigration()

async function migrateProduct(product: any) {
  const image = migration.createAsset(product.images.nodes[0].thumbnail, product.title)
  let doc
  try {
    doc = await writeClient.getByUID('product', product.handle, { lang: 'it-IT' })
  }
  catch {
    doc = false
  }
  console.log('DOC FOUND', doc)
  if (doc) {
    console.log('Product already exists', product.handle)
  }
  else {
    migration.createDocument({
      type: 'product',
      uid: product.handle,
      lang: 'it-IT',
      data: {
        title: product.title,
        price: Number.parseFloat(product.actual.price.amount),
        description: htmlAsRichText(product.descriptionHtml),
        image,
        // shopify_id: product.id,
      },
    }, product.title)

    await writeClient.migrate(migration, { reporter: event => console.log('Event', event.type) })
  }
}

export default defineEventHandler(async (event) => {
  // const data = await $fetch(()=>GqlProducts({ first: 15 }))
  const query = getQuery(event)
  const first = Number.parseInt(query.first as string) || 20
  const { products } = await GqlProducts({ first })
  const promises = []
  for (const product of products.nodes) {
    promises.push(migrateProduct(product))
  }
  await Promise.allSettled(promises)

  return { satuts: 'OK', products: products.nodes }
})
