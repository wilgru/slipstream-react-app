/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("35y5ayizwh2c9fk")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select1836268962",
    "maxSelect": 1,
    "name": "groupBy",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "created",
      "journal"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("35y5ayizwh2c9fk")

  // remove field
  collection.fields.removeById("select1836268962")

  return app.save(collection)
})
