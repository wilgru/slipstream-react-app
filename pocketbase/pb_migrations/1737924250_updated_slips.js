/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("75h1r0vz3gvycqp");

    // update field
    collection.fields.addAt(
      6,
      new Field({
        cascadeDelete: false,
        collectionId: "35y5ayizwh2c9fk",
        hidden: false,
        id: "phorn9bk",
        maxSelect: 2147483647,
        minSelect: 0,
        name: "journals",
        presentable: false,
        required: false,
        system: false,
        type: "relation",
      })
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("75h1r0vz3gvycqp");

    // update field
    collection.fields.addAt(
      6,
      new Field({
        cascadeDelete: false,
        collectionId: "35y5ayizwh2c9fk",
        hidden: false,
        id: "phorn9bk",
        maxSelect: 2147483647,
        minSelect: 0,
        name: "journals",
        presentable: false,
        required: false,
        system: false,
        type: "relation",
      })
    );

    return app.save(collection);
  }
);
