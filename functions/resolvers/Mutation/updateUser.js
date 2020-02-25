const FormatDate = require('date-fns/format');
const stripe = require('../../helpers/stripe');

module.exports = async (root, args, { client, q }) => {
  const {
    email,
    bio,
    firstName,
    lastName,
    dob,
    addressLine1,
    addressLine2,
    city,
    postalCode,
  } = args.user;

  const { stripeID } = await client.query(
    q.Select(['data'], q.Get(q.Identity()))
  );

  const [day, month, year] = FormatDate(new Date(dob), 'dd/MM/yyyy').split('/');

  await stripe.accounts.update(stripeID, {
    individual: {
      first_name: firstName,
      last_name: lastName,
      address: {
        city,
        line1: addressLine1,
        line2: addressLine2,
        postal_code: postalCode,
      },
      dob: {
        day,
        month,
        year,
      },
    },
  });

  await client.query(
    q.Update(q.Identity(), {
      data: {
        email,
        bio,
      },
    })
  );

  return true;
};
