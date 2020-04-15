const { UserInputError } = require('apollo-server-lambda');
const sendMail = require('../../helpers/sendMail');
const stripe = require('../../helpers/stripe');
const { USER_TYPE } = require('../../consts');

const registrationEmail = ({ name, verificationUrl }) => `
Hi ${name},

Thank you for registering to use Peach.

Please verify your email by clicking the link below:

${verificationUrl}

If you have any questions feel free to email us at peachapp.io@gmail.com.

Thanks,
The Peach Team
https://peachapp.io
`;

const registrationEmailHTML = ({ name, verificationUrl }) => `
<p>Hi ${name},</p>

<p>Thank you for registering to use Peach.</p>

<p>Please verify your email by clicking <a href="${verificationUrl}">here</a></p>



<p>If you have any questions feel free to email us at peachapp.io@gmail.com.</p>

<p>Thanks</p>,
<p>The Peach Team</p>
<p>https://peachapp.io</p>
`;

module.exports = async (
  root,
  args,
  { client, q, clientIp, DocumentDataWithId }
) => {
  const { name, password, type, idempotencyKey } = args;

  const email = args.email.toLowerCase();

  const existingUser = await client.query(
    q.Exists(q.Match(q.Index('user_by_email'), email))
  );

  if (existingUser) {
    throw new UserInputError('A user with this email address already exists.');
  }

  const createStripeAccount = async () => {
    if (type === USER_TYPE.BRAND) {
      return stripe.customers.create(
        {
          email,
        },
        {
          idempotencyKey,
        }
      );
    }

    return stripe.accounts.create(
      {
        email,
        type: 'custom',
        requested_capabilities: ['transfers'],
        business_type: 'individual',
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: clientIp,
        },
      },
      {
        idempotencyKey,
      }
    );
  };

  const account = await createStripeAccount();

  const emailVerification = await client.query(
    q.Let(
      {
        emailVerification: q.Create(q.Collection('EmailVerification'), {
          data: {
            isVerified: false,
          },
        }),
      },
      DocumentDataWithId(q.Var('emailVerification'))
    )
  );

  await client.query(
    q.Create(q.Collection('User'), {
      data: {
        name,
        email,
        type,
        stripeID: account.id,
        emailVerificationToken: emailVerification._id,
      },
      credentials: { password },
    })
  );

  const verificationUrl = `https://dashboard.peachapp.io/verify-email/${emailVerification._id}`;

  await sendMail({
    to: email,
    subject: 'Welcome to Peach!',
    text: registrationEmail({
      name,
      verificationUrl,
    }),
    html: registrationEmailHTML({
      name,
      verificationUrl,
    }),
  });

  const authToken = await client.query(
    q.Login(q.Match(q.Index('user_by_email'), email), {
      password,
    })
  );

  return authToken;
};
