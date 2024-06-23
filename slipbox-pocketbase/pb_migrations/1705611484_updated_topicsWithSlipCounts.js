/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("87s8cpf3uhw1w9k")

  collection.options = {
    "query": "SELECT\n  t.id, \n  t.user,\n  t.name, \n  t.colour,\n  COUNT(st.value) as totalSlips\nFROM \n  slips as s,\n  JSON_EACH(s.topics) as st\nRIGHT JOIN topics as t on t.id = st.value\nGROUP BY t.name"
  }

  // remove
  collection.schema.removeField("gipy9at3")

  // remove
  collection.schema.removeField("qqvs0el6")

  // remove
  collection.schema.removeField("j22yrid2")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("87s8cpf3uhw1w9k")

  collection.options = {
    "query": "SELECT\n  t.id, \n  t.user,\n  t.name, \n  COUNT(st.value) as totalSlips\nFROM \n  slips as s,\n  JSON_EACH(s.topics) as st\nRIGHT JOIN topics as t on t.id = st.value\nGROUP BY t.name"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gipy9at3",
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
    "id": "qqvs0el6",
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
    "id": "j22yrid2",
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
  collection.schema.removeField("v4ltskbf")

  // remove
  collection.schema.removeField("7lpvbyko")

  // remove
  collection.schema.removeField("w6pijq2u")

  // remove
  collection.schema.removeField("6yhc3hnm")

  return dao.saveCollection(collection)
})
