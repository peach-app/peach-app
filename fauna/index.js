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
    await require('./collections/EmailVerification')();

    // Indexes
    await require('./indexes/all_campaign')();
    await require('./indexes/all_campaign_by_private')();
    await require('./indexes/message_by_thread')();
    await require('./indexes/booking_by_campaign')();
    await require('./indexes/booking_by_state')();
    await require('./indexes/booking_by_user')();
    await require('./indexes/booking_campaign_by_user_state')();
    await require('./indexes/booking_campaign_by_state')();
    await require('./indexes/campaign_by_user')();
    await require('./indexes/thread_users_by_user')();
    await require('./indexes/thread_users_by_thread')();
    await require('./indexes/thread_users_by_thread_user')();
    await require('./indexes/user_by_email')();
    await require('./indexes/user_name_by_type')();
    await require('./indexes/booking_campaign_by_user')();

    // Roles
    await require('./roles/auth')();
    await require('./roles/user')();

    // End
  } catch (err) {
    console.error(err);
  }
})();
