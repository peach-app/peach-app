const omitBy = require('lodash/omitBy');
const isNil = require('lodash/isNil');

module.exports = async (
  root,
  { socialAccounts },
  { client, q, activeUserRef }
) => {
  await client.query(
    q.Update(activeUserRef, {
      data: {
        socialAccounts: omitBy(socialAccounts, isNil),
      },
    })
  );

  return true;
};
