ADMIN_LOGIN = "admin" 
ADMIN_PWD = "1234"

use admin
db.auth(ADMIN_LOGIN, ADMIN_PWD)

use database
db.adminCommand({ 
    shardCollection: "database.black_holes",
    key: {_id: "hashed"}
})

db.runCommand({
  collMod: "black_holes",
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
          description: "Name must be in string format."
        },
        radius: {
          bsonType: [ "double", "int" ],
          minimum: 0,
          description: "Radius must be a positive integer."
        },
        weight: {
          bsonType: [ "int", "double" ],
          minimum: 0,
          description: "Weight must be a positive number representing solar masses."
        },
        type: {
          bsonType: "string",
          enum: [ "Primordial", "Intermediate", "Supermassive", "Stellar" ],
          description: "List must contain only those types: Primordial, Intermediate, Supermassive, Stellar."
        },
        galaxy_id: {
          bsonType: "objectId",
          description: "Id must be ObjectId(<hex string of lenght 24>) of existing galaxy."
        }
      }
    }
  },
  validationAction: "error"
});

db.black_holes.insertMany([
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "Sagittarius A*",                    radius: 2000000, weight: 4100000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "Scorpius X-1",                      radius: 35,      weight: 10.9,         type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "GX 339-4",                          radius: 18,      weight: 8.3,          type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "Cyg X-1",                           radius: 30,      weight: 14.0,         type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "GRO J1655-40",                      radius: 20,      weight: 7.5,          type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "XTE J1650-500",                     radius: 15,      weight: 7.0,          type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,              name: "M101 Black Hole",                   radius: 100000,  weight: 10.0,         type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Large Magellanic Cloud"}).next()._id, name: "Large Magellanic Cloud Black Hole", radius: 12,      weight: 5,            type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Andromeda"}).next()._id,              name: "Andromeda I",                       radius: 140000,  weight: 10000000.0,   type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "Andromeda"}).next()._id,              name: "M31 X-1",                           radius: 35,      weight: 15.0,         type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Andromeda"}).next()._id,              name: "NGC 224 Black Hole",                radius: 220000,  weight: 2500000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "Triangulum"}).next()._id,             name: "M33 X-7",                           radius: 30,      weight: 15.0,         type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "Sombrero"}).next()._id,               name: "M104 Black Hole",                   radius: 250000,  weight: 1000000000.0, type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "Cartwheel"}).next()._id,              name: "Cartwheel Galaxy Black Hole",       radius: 100000,  weight: 10000000.0,   type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 6744"}).next()._id,               name: "NGC 6744 Black Hole",               radius: 150000,  weight: 16000000.0,   type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1300"}).next()._id,               name: "NGC 1300 Black Hole",               radius: 120000,  weight: 10000000.0,   type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 3370"}).next()._id,               name: "NGC 3370 Black Hole",               radius: 120000,  weight: 5000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1232"}).next()._id,               name: "NGC 1232 Black Hole",               radius: 100000,  weight: 3000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1068"}).next()._id,               name: "NGC 1068 Black Hole",               radius: 140000,  weight: 10000000.0,   type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 6946"}).next()._id,               name: "NGC 6946 Black Hole",               radius: 120000,  weight: 7000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 4414"}).next()._id,               name: "NGC 4414 Black Hole",               radius: 110000,  weight: 4500000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 3627"}).next()._id,               name: "NGC 3627 Black Hole",               radius: 110000,  weight: 5000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 7331"}).next()._id,               name: "NGC 7331 Black Hole",               radius: 130000,  weight: 6000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 2903"}).next()._id,               name: "NGC 2903 Black Hole",               radius: 90000,   weight: 2000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 2841"}).next()._id,               name: "NGC 2841 Black Hole",               radius: 100000,  weight: 3500000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 3982"}).next()._id,               name: "NGC 3982 Black Hole",               radius: 95000,   weight: 3300000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 5128"}).next()._id,               name: "NGC 5128 Black Hole",               radius: 120000,  weight: 7000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1316"}).next()._id,               name: "NGC 1316 Black Hole",               radius: 140000,  weight: 8000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1399"}).next()._id,               name: "NGC 1399 Black Hole",               radius: 150000,  weight: 9000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1275"}).next()._id,               name: "NGC 1275 Black Hole",               radius: 160000,  weight: 12000000.0,   type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 2639"}).next()._id,               name: "NGC 2639 Black Hole",               radius: 80000,   weight: 2000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 3568"}).next()._id,               name: "NGC 3568 Black Hole",               radius: 110000,  weight: 4500000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1566"}).next()._id,               name: "NGC 1566 Black Hole",               radius: 90000,   weight: 3000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 2276"}).next()._id,               name: "NGC 2276 Black Hole",               radius: 100000,  weight: 2000000.0,    type: "Supermassive"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1569"}).next()._id,               name: "NGC 1569 Black Hole",               radius: 40000,   weight: 1000000.0,    type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "NGC 1705"}).next()._id,               name: "NGC 1705 Black Hole",               radius: 35000,   weight: 900000.0,     type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "NGC 4449"}).next()._id,               name: "NGC 4449 Black Hole",               radius: 45000,   weight: 1500000.0,    type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "NGC 6822"}).next()._id,               name: "NGC 6822 Black Hole",               radius: 30000,   weight: 800000.0,     type: "Stellar"},
  {galaxy_id: db.galaxies.find({"name": "NGC 628"}).next()._id,                name: "NGC 628 Black Hole",                radius: 110000,  weight: 3000000.0,    type: "Supermassive"},
]);
