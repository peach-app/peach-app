const { UserInputError } = require('apollo-server-lambda');
const sendMail = require('../../helpers/sendMail');

const requestPasswordResetEmail = ({ name, resetUrl }) => `
Hi ${name},

Looks like you forgot your password.

Don't worry - it happens to the best of us.

To reset your password follow the link below:

${resetUrl}

If you have any questions feel free to email us at peachapp.io@gmail.com.

Thanks,
The Peach Team
https://peachapp.io
`;

const requestPasswordResetEmailHTML = ({ name, resetUrl }) => `
<p>Hi ${name},</p>

<p>Looks like you forgot your password.</p>

<p>Don't worry - it happens to the best of us.</p>

<p>To reset it, simply follow the <a href="${resetUrl}">link</a></p>



<p>If you have any questions feel free to email us at peachapp.io@gmail.com.</p>

<p>Thanks,</p>
<p>The Peach Team</p>
<p>https://peachapp.io</p>
`;

module.exports = async (root, { email }, { client, q, DocumentDataWithId }) => {
  const existingUser = await client.query(
    q.Let(
      {
        user: q.Match(q.Index('user_by_email'), email),
      },
      q.If(
        q.Exists(q.Var('user')),
        DocumentDataWithId(q.Get(q.Var('user'))),
        false
      )
    )
  );

  if (!existingUser) {
    throw new UserInputError('☝️ The email is not registered with us');
  }

  // based on DEV env:
  // dashboard.peachapp.io
  // OR
  const base = '192.168.1.108:19006';
  const resetUrl = `http://${base}/reset-password/${existingUser._id}`;

  await sendMail({
    to: email,
    subject: 'Reset your password',
    text: requestPasswordResetEmail({ name: existingUser.name, resetUrl }),
    html: requestPasswordResetEmailHTML({
      name: existingUser.name,
      resetUrl,
    }),
  });

  await client.query(
    q.Update(q.Ref(q.Collection('User'), existingUser._id), {
      data: {
        hasRequestedPasswordReset: true,
      },
    })
  );

  return true;
};
