"use strict";
const q = require("faunadb").query;
const client = require("../db");

module.exports.up = async function(next) {
  // create users collection
  await client.query(q.CreateCollection({ name: "users" }));

  // create all_users index
  await client.query(
    q.CreateIndex({
      name: "all_users",
      source: q.Collection("users")
    })
  );

  // create users_by_email index
  await client.query(
    q.CreateIndex({
      name: "users_by_email",
      source: q.Collection("users"),
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

  // delete users collection
  await client.query(q.Delete(q.Collection("users")));

  next();
};
