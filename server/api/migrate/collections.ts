import process from 'node:process'
import * as prismic from '@prismicio/client'
import { htmlAsRichText } from '@prismicio/migrate'

import 'dotenv/config'

const writeClient = prismic.createWriteClient('radici-pugliesi', {
  writeToken: process.env.PRISMIC_WRITE_TOKEN!,
})

const migration = prismic.createMigration()

async function migrateCollection(collection: any) {
  try {
    let image = null
    if (collection.image?.src) {
      image = migration.createAsset(collection.image?.src, collection.title)
    }
    let doc
    try {
      doc = await writeClient.getByUID('collection', collection.handle)
    }
    catch {
      doc = null
    }
    console.log('Collection found', doc)
    if (doc) {
      console.log('Collection already exists', collection.handle)
      
    }
    else {
      migration.createDocument({
        type: 'collection',
        uid: collection.handle,
        lang: 'it-IT',
        data: {
          title: collection.title,
          description: htmlAsRichText(collection.descriptionHtml),
          image,
          // shopify_id: collection.id,
        },
      }, collection.title)

      await writeClient.migrate(migration, { reporter: event => console.log('Event', event.type) })
    }
    
  }
  catch (error) {
    console.log('Error', error)
  }
}

export default defineEventHandler(async (event) => {
  // const data = await $fetch(()=>GqlProducts({ first: 15 }))
  const query = getQuery(event)
  const first = Number.parseInt(query.first as string) || 20
  const { collections } = await GqlGetCollections({ first })
  const promises = []
  for (const collection of collections.nodes) {
    promises.push(migrateCollection(collection))
  }

  await Promise.all(promises)

  return { satuts: 'OK', collections: collections.nodes }
})
