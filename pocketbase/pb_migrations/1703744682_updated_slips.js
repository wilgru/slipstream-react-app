/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("75h1r0vz3gvycqp");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "phorn9bk",
        name: "journals",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "35y5ayizwh2c9fk",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("75h1r0vz3gvycqp");

    // remove
    collection.schema.removeField("phorn9bk");

    return dao.saveCollection(collection);
  }
);
