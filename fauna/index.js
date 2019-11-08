const { FAUNADB_SECRET } = process.env;

if (!FAUNADB_SECRET) {
  console.error(
    `No FAUNADB_SECRET found... \nrun: export FAUNADB_SECRET=SecretKeyHere`
  );
  return;
}

console.log({ FAUNADB_SECRET });

(async () => {
  try {
    // Functions
    await require('./functions/user_login')();
    await require('./functions/current_user')();
    await require('./functions/register')();
    await require('./functions/campaigns_by_user_type')();
    await require('./functions/create_message')();

    // Indexes
    await require('./indexes/messages_by_date_asc')();

    // Roles
    await require('./roles/auth')();
    await require('./roles/user')();

    // End
  } catch (err) {
    console.error(err);
  }
})();
