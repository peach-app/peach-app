"use strict";
const q = require("faunadb").query;
const client = require("../db");

module.exports.up = async function(next) {
  // create users class
  await client.query(q.CreateClass({ name: "users" }));

  // create all_users index
  await client.query(
    q.CreateIndex({
      name: "all_users",
      source: q.Class("users")
    })
  );

  // create users_by_email index
  await client.query(
    q.CreateIndex({
      name: "users_by_email",
      source: q.Class("users"),
      terms: [{ field: ["data", "email"] }],
      unique: true
    })
  );

  next();
};

module.exports.down = async function(next) {
  // delete all_users index
  await client.query(q.Delete(q.Index("all_users")));

  // delete users_by_email index
  await client.query(q.Delete(q.Index("users_by_email")));

  // delete users class
  await client.query(q.Delete(q.Class("users")));

  next();
};
