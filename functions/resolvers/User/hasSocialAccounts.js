module.exports = async root => {
  return Object.values(root.socialAccounts || {}).some(value => Boolean(value));
};
