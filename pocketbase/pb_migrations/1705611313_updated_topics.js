/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("35y5ayizwh2c9fk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mkgkep1s",
    "name": "colour",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "red",
        "orange",
        "yellow",
        "lime",
        "green",
        "blue",
        "cyan",
        "pink",
        "purple",
        "brown",
        "grey"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("35y5ayizwh2c9fk")

  // remove
  collection.schema.removeField("mkgkep1s")

  return dao.saveCollection(collection)
})
