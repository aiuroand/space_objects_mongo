ADMIN_LOGIN = "admin" 
ADMIN_PWD = "1234"

use admin 
db.auth(ADMIN_LOGIN, ADMIN_PWD)

use database
db.adminCommand({ 
    shardCollection: "database.stars",
    key: {_id: "hashed"}
})

db.runCommand({
  collMod: "stars",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "name" ],
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be unique string."
        },
        radius: {
          bsonType: [ "double", "int" ],
          minimum: 0,
          description: "Radius must be a positive number."
        },
        weight: {
          bsonType: [ "int", "double" ],
          minimum: 0,
          description: "Weight must be a positive number.",
        },
        type: {
          bsonType: "string",
          "enum": [ "Main Sequence Star", "Red Giant", "White Dwarf", "Neutron Star", "Red Dwarf", "Brown Dwarf" ],
          description: "Value must be only one of those types: 'Main Sequence Star', 'Red Giant', 'White Dwarf', 'Neutron Star', 'Red Dwarf', 'Brown Dwarf'"
        },
        planets: {
          bsonType: "array",
          uniqueItems: true,
          items: {
            bsonType: "object",
            required: [ "name" ],
            properties: {
              name: {
                bsonType: "string",
                description: "Name must be unique string."
              },
              radius: {
                bsonType: [ "int", "double" ],
                minimum: 0,
                description: "Radius must be a positive number."
              },
              weight: {
                bsonType: [ "int", "double" ],
                minimum: 0,
                description: "Weight must be a positive number.",
              },
              type: {
                bsonType: "string",
                "enum": [ "Gas Giant", "Terrestrial", "Neptune-Like", "Super-Earth" ],
                description: "List must contain only those types: 'Gas Giant', 'Terresterial', 'Neptune-Like', 'Super-Earth'."
              },
              moons: {
                bsonType: "array",
                uniqueItems: true,
                items: {
                  bsonType: "string",
                  description: "Names must be unique strings.",
                }
              }
            }
          }
        }
      }
    }
  },
  validationAction: "error"
});

db.stars.insertMany([
    {
      galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,
      name: "Sun",
      radius: 0.0000069634,
      weight: 1,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Mercury", 
          radius: 0.00000000461, 
          weight: 0.0000553, 
          type: "Terrestrial", 
          moons: []
        },
        { 
          name: "Venus", 
          radius: 0.00000001121, 
          weight: 0.000815, 
          type: "Terrestrial", 
          moons: []
        },
        { 
          name: "Earth", 
          radius: 0.00000001274, 
          weight: 0.0000597, 
          type: "Terrestrial", 
          moons: ["Moon"]
        },
        { 
          name: "Mars", 
          radius: 0.00000000679, 
          weight: 0.0000322, 
          type: "Terrestrial", 
          moons: ["Phobos", "Deimos"]
        },
        { 
          name: "Jupiter", 
          radius: 0.00000007149, 
          weight: 0.000954, 
          type: "Gas Giant", 
          moons: ["Io", "Europa", "Ganymede", "Callisto"]
        },
        { 
          name: "Saturn", 
          radius: 0.00000006031, 
          weight: 0.000285, 
          type: "Gas Giant", 
          moons: ["Titan", "Rhea"]
        },
        { 
          name: "Uranus", 
          radius: 0.00000002589, 
          weight: 0.0000437, 
          type: "Gas Giant", 
          moons: ["Titania", "Oberon"]
        },
        { 
          name: "Neptune", 
          radius: 0.00000002462, 
          weight: 0.0000532, 
          type: "Gas Giant", 
          moons: ["Triton"]
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,
      name: "Kepler-22",
      radius: 0.0000060511946,
      weight: 0.857,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Kepler-22B", 
          radius: 0.0000000187, 
          weight: 0.000086565, 
          type: "Terrestrial", 
          moons: []
        },
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Milky Way"}).next()._id,
      name: "UY Scuti",
      radius: 0.0272,
      weight: 8,
      type: "Red Giant",
      planets: []
    },
    {
      galaxy_id: db.galaxies.find({"name": "Large Magellanic Cloud"}).next()._id,
      name: "R136a1",
      radius: 0.000672,
      weight: 200,
      type: "Main Sequence Star",
      planets: []
    },
    {
      galaxy_id: db.galaxies.find({"name": "Andromeda"}).next()._id,
      name: "Alpha Andromedae",
      radius: 0.000016,
      weight: 2.1,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Andromeda B", 
          radius: 0.00000000400, 
          weight: 0.0000045, 
          type: "Terrestrial", 
          moons: []
        },
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Triangulum"}).next()._id,
      name: "Triangulum Alpha",
      radius: 0.000015,
      weight: 1.5,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Triangulum b", 
          radius: 0.00000000320, 
          weight: 0.0000050, 
          type: "Terrestrial", 
          moons: []
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Messier 87"}).next()._id,
      name: "Messier 87 Alpha",
      radius: 0.000022,
      weight: 3.0,
      type: "Red Giant",
      planets: [
        { 
          name: "M87 b", 
          radius: 0.00000000500, 
          weight: 0.0000100, 
          type: "Gas Giant", 
          moons: ["M87b I"]
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Whirlpool"}).next()._id,
      name: "Whirlpool Alpha",
      radius: 0.000017,
      weight: 1.8,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Whirlpool b", 
          radius: 0.00000000380, 
          weight: 0.0000060, 
          type: "Gas Giant", 
          moons: ["Whirlpoolb I"]
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Sombrero"}).next()._id,
      name: "Sombrero Alpha",
      radius: 0.000018,
      weight: 2.0,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Sombrero b", 
          radius: 0.00000000310, 
          weight: 0.0000045, 
          type: "Terrestrial", 
          moons: ["SombreroB I"]
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Pinwheel"}).next()._id,
      name: "Pinwheel Alpha",
      radius: 0.000019,
      weight: 2.5,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "Pinwheel b", 
          radius: 0.00000000450, 
          weight: 0.0000070, 
          type: "Gas Giant", 
          moons: ["Pinwheelb I"]
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "Cartwheel"}).next()._id,
      name: "Cartwheel Alpha",
      radius: 0.000020,
      weight: 3.2,
      type: "Red Giant",
      planets: [
        { 
          name: "Cartwheel b", 
          radius: 0.00000000600, 
          weight: 0.0000090, 
          type: "Gas Giant", 
          moons: ["Cartwheelb I"]
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "NGC 6744"}).next()._id,
      name: "NGC 6744 Alpha",
      radius: 0.000014,
      weight: 1.7,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "NGC 6744 b", 
          radius: 0.00000000300, 
          weight: 0.0000050, 
          type: "Terrestrial", 
          moons: []
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "NGC 1300"}).next()._id,
      name: "NGC 1300 Alpha",
      radius: 0.000018,
      weight: 2.2,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "NGC 1300 b", 
          radius: 0.00000000450, 
          weight: 0.0000070, 
          type: "Gas Giant", 
          moons: []
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "NGC 3370"}).next()._id,
      name: "NGC 3370 Alpha",
      radius: 0.000015,
      weight: 1.4,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "NGC 3370 b", 
          radius: 0.00000000320, 
          weight: 0.0000052, 
          type: "Gas Giant", 
          moons: []
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "NGC 1232"}).next()._id,
      name: "NGC 1232 Alpha",
      radius: 0.000016,
      weight: 1.6,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "NGC 1232 b", 
          radius: 0.00000000370, 
          weight: 0.0000060, 
          type: "Gas Giant", 
          moons: []
        }
      ]
    },
    {
      galaxy_id: db.galaxies.find({"name": "NGC 1068"}).next()._id,
      name: "NGC 1068 Alpha",
      radius: 0.000017,
      weight: 1.9,
      type: "Main Sequence Star",
      planets: [
        { 
          name: "NGC 1068 b", 
          radius: 0.00000000400, 
          weight: 0.0000068, 
          type: "Gas Giant", 
          moons: []
        }
      ]
    }
  ]);
  
  