/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("35y5ayizwh2c9fk");

    // update collection data
    unmarshal(
      {
        name: "journals",
      },
      collection
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("35y5ayizwh2c9fk");

    // update collection data
    unmarshal(
      {
        name: "journals",
      },
      collection
    );

    return app.save(collection);
  }
);
