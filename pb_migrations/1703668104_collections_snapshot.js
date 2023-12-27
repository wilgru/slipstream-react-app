/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "75h1r0vz3gvycqp",
      "created": "2023-11-03 09:25:46.687Z",
      "updated": "2023-12-27 08:44:24.640Z",
      "name": "slips",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wjn2pilp",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "vwnpx6l0",
          "name": "content",
          "type": "json",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "pfftyfhl",
          "name": "isPinned",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "zyykuufo",
          "name": "isFlagged",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "hdbtj9oz",
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
        },
        {
          "system": false,
          "id": "tdg6yhsm",
          "name": "deleted",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "user = @request.auth.id",
      "viewRule": null,
      "createRule": "user = @request.auth.id",
      "updateRule": "user = @request.auth.id",
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "_pb_users_auth_",
      "created": "2023-11-04 03:48:06.082Z",
      "updated": "2023-12-09 06:02:28.177Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
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
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
