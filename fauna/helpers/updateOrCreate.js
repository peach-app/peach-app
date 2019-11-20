const { q } = require('./db');

const creator = (TypeFunc, CreateFunc) => ({ name, ...rest }) => {
  return q.If(
    q.Exists(TypeFunc(name)),
    q.Update(TypeFunc(name), rest),
    CreateFunc({ name, ...rest })
  );
};

module.exports = {
  makeRole: creator(q.Role, q.CreateRole),
  makeIndex: creator(q.Index, q.CreateIndex),
};
