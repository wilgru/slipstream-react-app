/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("87s8cpf3uhw1w9k");

    // update collection data
    unmarshal(
      {
        name: "journalsWithSlipCounts",
        viewQuery:
          "SELECT\n  j.id, \n  j.user,\n  j.name, \n  j.colour,\n  COUNT(sj.value) as totalSlips\nFROM \n  slips as s,\n  JSON_EACH(s.journals) as sj\nRIGHT JOIN journals as j on j.id = sj.value\nGROUP BY j.name",
      },
      collection
    );

    // remove field
    collection.fields.removeById("_clone_KI4m");

    // remove field
    collection.fields.removeById("_clone_sUDU");

    // remove field
    collection.fields.removeById("_clone_huJb");

    // add field
    collection.fields.addAt(
      1,
      new Field({
        cascadeDelete: false,
        collectionId: "_pb_users_auth_",
        hidden: false,
        id: "_clone_JC7I",
        maxSelect: 1,
        minSelect: 0,
        name: "user",
        presentable: false,
        required: false,
        system: false,
        type: "relation",
      })
    );

    // add field
    collection.fields.addAt(
      2,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "_clone_5Fnd",
        max: 0,
        min: 0,
        name: "name",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      })
    );

    // add field
    collection.fields.addAt(
      3,
      new Field({
        hidden: false,
        id: "_clone_rBsn",
        maxSelect: 1,
        name: "colour",
        presentable: false,
        required: false,
        system: false,
        type: "select",
        values: [
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
          "default",
        ],
      })
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("87s8cpf3uhw1w9k");

    // update collection data
    unmarshal(
      {
        name: "journalsWithSlipCounts",
        viewQuery:
          "SELECT\n  t.id, \n  t.user,\n  t.name, \n  t.colour,\n  COUNT(st.value) as totalSlips\nFROM \n  slips as s,\n  JSON_EACH(s.journals) as st\nRIGHT JOIN journals as t on t.id = st.value\nGROUP BY t.name",
      },
      collection
    );

    // add field
    collection.fields.addAt(
      1,
      new Field({
        cascadeDelete: false,
        collectionId: "_pb_users_auth_",
        hidden: false,
        id: "_clone_KI4m",
        maxSelect: 1,
        minSelect: 0,
        name: "user",
        presentable: false,
        required: false,
        system: false,
        type: "relation",
      })
    );

    // add field
    collection.fields.addAt(
      2,
      new Field({
        autogeneratePattern: "",
        hidden: false,
        id: "_clone_sUDU",
        max: 0,
        min: 0,
        name: "name",
        pattern: "",
        presentable: false,
        primaryKey: false,
        required: false,
        system: false,
        type: "text",
      })
    );

    // add field
    collection.fields.addAt(
      3,
      new Field({
        hidden: false,
        id: "_clone_huJb",
        maxSelect: 1,
        name: "colour",
        presentable: false,
        required: false,
        system: false,
        type: "select",
        values: [
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
          "default",
        ],
      })
    );

    // remove field
    collection.fields.removeById("_clone_JC7I");

    // remove field
    collection.fields.removeById("_clone_5Fnd");

    // remove field
    collection.fields.removeById("_clone_rBsn");

    return app.save(collection);
  }
);
