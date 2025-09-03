ADMIN_LOGIN = "admin" 
ADMIN_PWD = "1234"

use admin 
db.auth(ADMIN_LOGIN, ADMIN_PWD)

use database
db.adminCommand({ 
    shardCollection: "database.galaxies",
    key: {_id: "hashed"}
})

db.runCommand({
  collMod: "galaxies",
  validator: {
    $jsonSchema: {
        bsonType: "object",
        required: [ "name" ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "Id must be ObjectId(<hex string of lenght 24>)."
          },
          name: {
              bsonType: "string",
              description: "Name must be unique string."
          },
          radius: {
            bsonType: [ "double", "int" ],
            minimum: 0,
            description: "Radius must be a positive integer."
          },
          type: {
            bsonType: "array",
            uniqueItems: true,
            items: {
              bsonType: "string",
              "enum": [ "Spiral", "Elliptical", "Lenticular", "Irregular", "Active", "Seyfert", "Quasar", "Blazar" ],
              description: "List must contain only those types: Spiral, Elliptical, Lenticular, Irregular, Active, Seyfert, Quasar, Blazar."
            },
          },
      }
    }
  },
  validationAction: "error"
});

db.galaxies.insertMany([
  {name: "Milky Way", radius: 100000, type: ["Spiral"]},
  {name: "Large Magellanic Cloud", radius: 32200, type: ["Irregular"]},
  {name: "Andromeda", radius: 220000, type: ["Spiral"]},
  {name: "Triangulum", radius: 60000, type: ["Spiral"]},
  {name: "Messier 87", radius: 120000, type: ["Elliptical"]},
  {name: "Whirlpool", radius: 60000, type: ["Spiral"]},
  {name: "Sombrero", radius: 50000, type: ["Spiral"]},
  {name: "Pinwheel", radius: 30000, type: ["Spiral"]},
  {name: "Cartwheel", radius: 130000, type: ["Irregular"]},
  {name: "NGC 6744", radius: 200000, type: ["Spiral"]},
  {name: "NGC 1300", radius: 38000, type: ["Quasar", "Elliptical"]},
  {name: "NGC 3370", radius: 120000, type: ["Spiral"]},
  {name: "NGC 1232", radius: 100000, type: ["Spiral"]},
  {name: "NGC 1068", radius: 140000, type: ["Spiral"]},
  {name: "NGC 6946", radius: 120000, type: ["Quasar"]},
  {name: "NGC 4414", radius: 110000, type: ["Spiral"]},
  {name: "NGC 3627", radius: 110000, type: ["Spiral"]},
  {name: "NGC 7331", radius: 130000, type: ["Spiral"]},
  {name: "NGC 2903", radius: 90000, type: ["Spiral"]},
  {name: "NGC 2841", radius: 100000, type: ["Spiral"]},
  {name: "NGC 3982", radius: 95000, type: ["Spiral"]},
  {name: "NGC 5128", radius: 120000, type: ["Elliptical"]},
  {name: "NGC 1316", radius: 140000, type: ["Elliptical"]},
  {name: "NGC 1399", radius: 150000, type: ["Elliptical"]},
  {name: "NGC 1275", radius: 160000, type: ["Elliptical"]},
  {name: "NGC 2639", radius: 80000, type: ["Elliptical"]},
  {name: "NGC 3568", radius: 110000, type: ["Spiral"]},
  {name: "NGC 2276", radius: 100000, type: ["Spiral"]},
  {name: "NGC 1569", radius: 40000, type: ["Irregular"]},
  {name: "NGC 1705", radius: 35000, type: ["Quasar"]},
  {name: "NGC 4449", radius: 45000, type: ["Irregular"]},
  {name: "NGC 6822", radius: 30000, type: ["Irregular"]},
  {name: "NGC 628", radius: 110000, type: ["Spiral"]},
  {name: "NGC 1566", radius: 90000, type: ["Spiral"]},
  {name: "NGC 224", radius: 220000, type: ["Spiral"]},
  {name: "NGC 2336", radius: 80000, type: ["Spiral"]}
]);
