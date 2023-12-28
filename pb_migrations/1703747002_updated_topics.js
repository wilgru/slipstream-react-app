/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("35y5ayizwh2c9fk")

  collection.listRule = "user = @request.auth.id"
  collection.viewRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("35y5ayizwh2c9fk")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
