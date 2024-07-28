/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1vceznhtzl4q8a7",
    "created": "2024-07-28 00:27:50.699Z",
    "updated": "2024-07-28 00:27:50.699Z",
    "name": "types",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s9rhvrh8",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1vceznhtzl4q8a7");

  return dao.deleteCollection(collection);
})
