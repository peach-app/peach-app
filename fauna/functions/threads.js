const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'threads',
      body: q.Query(
        q.Lambda(
          ['size', 'afterCursor', 'beforeCursor'],
          q.Map(
            q.Paginate(q.Match(q.Index('thread_users_by_user'), q.Identity())),
            q.Lambda('ref', q.Get(q.Var('ref')))
          )
        )
      ),
    })
  );

  console.log('"threads" function created');
};
