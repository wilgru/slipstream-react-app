/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("1vceznhtzl4q8a7")

  // update collection data
  unmarshal({
    "name": "tags"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("1vceznhtzl4q8a7")

  // update collection data
  unmarshal({
    "name": "categories"
  }, collection)

  return app.save(collection)
})
