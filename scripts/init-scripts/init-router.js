sh.addShard("rs-shard-01/shard01-a:27017,shard01-b:27017,shard01-c:27017")
sh.addShard("rs-shard-02/shard02-a:27017,shard02-b:27017,shard02-c:27017")

use admin
db.createUser({
  user: 'admin',
  pwd: '1234',
  roles: [
    { role: 'root', db: 'admin' },
    { role: "clusterAdmin", db: "admin" },
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
});

db.auth("admin", "1234")

db.createUser({
    user: 'guest',
    pwd: 'guest',
    roles: [
      { role: "readWrite", db: "database" }
    ]
});

sh.enableSharding("database")