const Expo = require('expo-server-sdk').default;
const faunadb = require('faunadb');
const q = faunadb.query;

const expo = new Expo();

exports.handler = async ({ headers, body }) => {
  if (!headers.authorization) {
    return { statusCode: 401 };
  }

  const [_, secret] = headers.authorization.split('Bearer ');

  const client = new faunadb.Client({ secret });

  const { text, threadId } = JSON.parse(body);

  if (!text || !threadId) {
    return {
      statusCode: 422,
    };
  }

  const message = await client.query(
    q.Create(q.Collection('Message'), {
      data: {
        user: q.Identity(),
        text,
        thread: q.Ref(q.Collection('Thread'), threadId),
        date: q.Time('now'),
      },
    })
  );

  const notifications = await client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('thread_users_by_thread'),
          q.Ref(q.Collection('Thread'), threadId)
        )
      ),
      q.Lambda('ref', {
        to: q.Select(['data', 'pushToken'], q.Get(q.Var('ref'))),
        sound: 'default',
        body: text,
      })
    )
  );

  const chunks = expo.chunkPushNotifications(notifications.data);
  await Promise.all(
    chunks.map(chunk => {
      return expo.sendPushNotificationsAsync(chunk);
    })
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(message),
  };
};
