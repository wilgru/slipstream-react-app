/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("75h1r0vz3gvycqp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d3jqpko6",
    "name": "type",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1vceznhtzl4q8a7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("75h1r0vz3gvycqp")

  // remove
  collection.schema.removeField("d3jqpko6")

  return dao.saveCollection(collection)
})
