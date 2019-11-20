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
    // Collections
    await require('./collections/User')();
    await require('./collections/thread_users')();
    await require('./collections/Thread')();
    await require('./collections/Message')();
    await require('./collections/Campaign')();
    await require('./collections/Booking')();

    // Indexes
    await require('./indexes/all_user')();
    await require('./indexes/all_thread')();
    await require('./indexes/all_thread_users')();
    await require('./indexes/all_message')();
    await require('./indexes/all_booking')();
    await require('./indexes/all_campaign')();
    await require('./indexes/message_thread_by_thread_by_date')();
    await require('./indexes/message_thread_by_thread')();
    await require('./indexes/booking_campaign_by_campaign')();
    await require('./indexes/booking_user_by_user')();
    await require('./indexes/campaign_user_by_user')();
    await require('./indexes/thread_users_by_user')();
    await require('./indexes/booking_by_campaign_user')();
    await require('./indexes/unique_user_email')();
    await require('./indexes/thread_users_by_thread')();
    await require('./indexes/thread_users_by_thread_and_user')();

    // Roles
    await require('./roles/auth')();
    await require('./roles/user')();

    // End
  } catch (err) {
    console.error(err);
  }
})();
