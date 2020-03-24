const omitBy = require('lodash/omitBy');
const isNil = require('lodash/isNil');

module.exports = async (root, { socialAccounts }, { client, q }) => {
  await client.query(
    q.Update(q.Identity(), {
      data: {
        socialAccounts: omitBy(socialAccounts, isNil),
      },
    })
  );

  return true;
};
