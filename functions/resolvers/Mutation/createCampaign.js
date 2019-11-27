module.exports = async (_, args, { client, q }) => {
  console.log('args', args);

  return client.query(
    q.Create(q.Collection('Campaign'), {
      data: {
        ...args,
      },
    })
  );

