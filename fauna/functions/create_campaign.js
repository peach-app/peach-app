const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'create_campaign',
      body: q.Query(
        q.Lambda(
          ['name', 'description', 'dueDate', 'private', 'budget'],
          q.Create(q.Collection('Campaign'), {
            data: {
              user: q.Identity(),
              name: q.Var('name'),
              description: q.Var('description'),
              dueDate: q.Var('dueDate'),
              private: q.Var('private'),
              budget: q.Var('budget'),
            },
          })
        )
      ),
    })
  );

  console.log('"create_campaign" function created');
};
