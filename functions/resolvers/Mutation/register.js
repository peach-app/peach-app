const transporter = require('../../helpers/mailTransporter');

const registrationEmail = ({ name }) => `
Hi ${name},

Thank you for registering to use Peach.

If you have any questions feel free to email us at peachapp.io@gmail.com.

Thanks,
The Peach Team
https://peachapp.io
`;

module.exports = async (root, args, { client, q }) => {
  const { name, password, type } = args;
  const email = args.email.toLowerCase();

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
          },
          credentials: { password },
        }),
        q.Login(q.Match(q.Index('user_by_email'), email), {
          password,
        })
      )
    )
  );

  transporter.sendMail(
    {
      from: 'peachapp.io@gmail.com',
      to: email,
      subject: 'Welcome to Peach!',
      text: registrationEmail({ name }),
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );

  return result;
};
