'use strict';
const { client, q } = require('../db');

module.exports.up = async () => {
  await client.query(
    q.CreateFunction({
      name: 'current_user',
      body: q.Query(q.Lambda([], q.Get(q.Identity()))),
    })
  );
};

module.exports.down = async () => {
  await client.query(q.Delete(q.Function('current_user')));
};
