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