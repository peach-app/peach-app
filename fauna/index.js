(async () => {
  try {
    // Functions
    await require('./functions/user_login')();
    await require('./functions/current_user')();
    await require('./functions/register')();
    await require('./functions/campaigns_by_user_type')();

    // Roles
    await require('./roles/auth')();
    await require('./roles/user')();

    // End
  } catch (err) {
    console.error(err);
  }
})();
