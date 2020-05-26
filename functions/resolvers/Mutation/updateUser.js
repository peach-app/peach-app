const FormatDate = require('date-fns/format');
const omitBy = require('lodash/omitBy');
const isNil = require('lodash/isNil');
const stripe = require('../../helpers/stripe');
const { USER_TYPE } = require('../../consts');

module.exports = async (root, args, { client, q, activeUserRef }) => {
  const {
    name,
    email,
    bio,
    firstName,
    lastName,
    dob,
    addressLine1,
    addressLine2,
    city,
    postalCode,
    notificationsToken,
    hasEnabledPushNotifications,
  } = args.user;
  console.log('SERVER', hasEnabledPushNotifications);
  const { stripeID, type } = await client.query(
    q.Select(['data'], q.Get(activeUserRef))
  );

  const isBrand = type === USER_TYPE.BRAND;

  const [day, month, year] = dob
    ? FormatDate(new Date(dob), 'dd/MM/yyyy').split('/')
    : [];

  if (
    !isBrand &&
    stripeID &&
    (email ||
      firstName ||
      lastName ||
      dob ||
      addressLine1 ||
      addressLine2 ||
      city ||
      postalCode)
  ) {
    await stripe.accounts.update(
      stripeID,
      omitBy(
        {
          email,
          individual: omitBy(
            {
              first_name: firstName,
              last_name: lastName,
              address: omitBy(
                {
                  city,
                  line1: addressLine1,
                  line2: addressLine2,
                  postal_code: postalCode,
                },
                isNil
              ),
              dob: omitBy(
                {
                  day,
                  month,
                  year,
                },
                isNil
              ),
            },
            isNil
          ),
        },
        isNil
      )
    );
  }

  if (isBrand && stripeID && email) {
    await stripe.customers.update(stripeID, {
      email,
    });
  }

  if (
    name ||
    email ||
    bio ||
    notificationsToken ||
    hasEnabledPushNotifications
  ) {
    await client.query(
      q.Update(activeUserRef, {
        data: omitBy(
          {
            name,
            email,
            bio,
            notificationsToken,
            hasEnabledPushNotifications,
          },
          isNil
        ),
      })
    );
  }

  return true;
};
