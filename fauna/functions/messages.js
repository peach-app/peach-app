const { client, q } = require('../helpers/db');
const { makeFunction } = require('../helpers/updateOrCreate');

module.exports = async () => {
  await client.query(
    makeFunction({
      name: 'messages',
      body: q.Query(
        q.Lambda(
          ['threadId', 'size', 'afterCursor', 'beforeCursor'],
          q.Map(
            q.Paginate(
              q.Match(
                q.Index('message_thread_by_thread_by_date'),
                q.Ref(q.Collection('Thread'), q.Var('threadId'))
              )
            ),
            q.Lambda(['date', 'ref'], q.Get(q.Var('ref')))
          )
        )
      ),
    })
  );

  console.log('"messages" function created');
};
