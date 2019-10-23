const { q } = require('./db');

const creator = (TypeFunc, CreateFunc) => ({ name, ...rest }) => {
  return q.If(
    q.Exists(TypeFunc(name)),
    q.Update(TypeFunc(name), rest),
    CreateFunc({ name, ...rest })
  );
};

module.exports = {
  makeFunction: creator(q.Function, q.CreateFunction),
  makeRole: creator(q.Role, q.CreateRole),
};
