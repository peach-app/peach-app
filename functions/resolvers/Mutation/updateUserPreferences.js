module.exports = async (
  root,
  { pushToken, preferences },
  { client, q, activeUserRef }
) => {
  await client.query(
    q.Update(activeUserRef, {
      data: {
        pushToken,
        preferences,
      },
    })
  );

  return true;
};
