module.exports = async (root, { emailVerificationToken }, { client, q }) => {
  await client.query(
    q.Update(q.Ref(q.Collection('EmailVerification'), emailVerificationToken), {
      data: {
        isVerified: true,
      },
    })
  );

  return true;
};
