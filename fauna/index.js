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
    await require('./functions/threads')();
    await require('./functions/messages')();
    await require('./functions/create_campaign')();

    // Indexes
    await require('./indexes/message_thread_by_thread_by_date')();
    await require('./indexes/booking_user_by_user')();
    await require('./indexes/campaign_user_by_user')();
    await require('./indexes/thread_users_by_user')();

    // Roles
    await require('./roles/auth')();
    await require('./roles/user')();

    // End
  } catch (err) {
    console.error(err);
  }
})();
