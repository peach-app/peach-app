const { UserInputError } = require('apollo-server-lambda');
const sendMail = require('../../helpers/sendMail');
const stripe = require('../../helpers/stripe');

const registrationEmail = ({ name }) => `
Hi ${name},

Thank you for registering to use Peach.

If you have any questions feel free to email us at peachapp.io@gmail.com.

Thanks,
The Peach Team
https://peachapp.io
`;

module.exports = async (root, args, { client, q }) => {
  const { name, password, type, idempotency_key } = args;
  const email = args.email.toLowerCase();

  const existingUser = await client.query(
    q.Exists(q.Match(q.Index('user_by_email'), email))
  );

  if (existingUser) {
    throw new UserInputError('A user with this email address already exists.');
  }

  const account = await stripe.accounts.create(
    {
      email,
      type: 'custom',
      country: 'GB',
      requested_capabilities: ['transfers', 'card_payments'],
    },
    {
      idempotency_key,
    }
  );

  const result = await client.query(
    q.If(
      q.Exists(q.Match(q.Index('user_by_email'), email)),
      q.Abort('A user with this email address already exists.'),
      q.Do(
        q.Create(q.Collection('User'), {
          data: {
            name,
            email,
            type,
            stripeID: account.id,
          },
          credentials: { password },
        }),
        q.Login(q.Match(q.Index('user_by_email'), email), {
          password,
        })
      )
    )
  );

  await sendMail({
    to: email,
    subject: 'Welcome to Peach!',
    text: registrationEmail({ name }),
  });

  return result;
};
