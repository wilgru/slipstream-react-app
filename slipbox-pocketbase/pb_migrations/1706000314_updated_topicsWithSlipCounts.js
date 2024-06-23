/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("87s8cpf3uhw1w9k")

  // remove
  collection.schema.removeField("v4ltskbf")

  // remove
  collection.schema.removeField("7lpvbyko")

  // remove
  collection.schema.removeField("w6pijq2u")

  // remove
  collection.schema.removeField("6yhc3hnm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j04u6gda",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qnpzoz1a",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z09r178e",
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
        "grey",
        "default"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfupergn",
    "name": "totalSlips",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("87s8cpf3uhw1w9k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v4ltskbf",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7lpvbyko",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w6pijq2u",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6yhc3hnm",
    "name": "totalSlips",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("j04u6gda")

  // remove
  collection.schema.removeField("qnpzoz1a")

  // remove
  collection.schema.removeField("z09r178e")

  // remove
  collection.schema.removeField("cfupergn")

  return dao.saveCollection(collection)
})
