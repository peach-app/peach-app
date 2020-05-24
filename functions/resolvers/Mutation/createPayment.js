const { UserInputError } = require('apollo-server-lambda');
const stripe = require('../../helpers/stripe');
const { PAYMENT_REASON, CAMPAIGN_CREATION_COST } = require('../../consts');
const calculateBookingCost = require('../../helpers/calculateBookingCost');

module.exports = async (
  root,
  { reason, bookingId, token, selectedId, promoCode },
  { client, q, activeUserRef }
) => {
  const promoDoc =
    promoCode &&
    (await client.query(
      q.Let(
        {
          ref: q.Match(q.Index('promoCode_by_code'), promoCode),
        },
        q.If(
          q.Exists(q.Var('ref')),
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_promoCode_by_user_promoCode'),
                  activeUserRef,
                  q.Select(['ref'], q.Get(q.Var('ref')))
                )
              )
            ),
            q.Get(q.Var('ref')),
            false
          ),
          false
        )
      )
    ));

  if (promoCode && !promoDoc) {
    throw new UserInputError('Invalid discount code');
  }

  const discount = promoDoc ? promoDoc.data.discount : 0;

  const getPaymentMethod = async () => {
    if (token) {
      return stripe.paymentMethods.create({
        type: 'card',
        card: {
          token,
        },
      });
    }

    return { id: selectedId };
  };

  const getPaymentCost = async () => {
    if (reason === PAYMENT_REASON.CREATE_CAMPAIGN) {
      return parseInt(
        CAMPAIGN_CREATION_COST - CAMPAIGN_CREATION_COST * discount
      );
    }

    if (reason === PAYMENT_REASON.ACCEPT_BOOKING) {
      const cost = await client.query(
        q.Select(
          ['data', 'cost'],
          q.Get(q.Ref(q.Collection('Booking'), bookingId))
        )
      );

      return calculateBookingCost(cost);
    }

    throw new Error('Invalid payment reason');
  };

  const customerId = await client.query(
    q.Select(['data', 'stripeID'], q.Get(activeUserRef))
  );
  const amount = await getPaymentCost();
  const { id: paymentId } = await getPaymentMethod();

  const {
    id,
    next_action: nextAction = null,
  } = await stripe.paymentIntents.create({
    amount,
    currency: 'gbp',
    confirm: true,
    payment_method: paymentId,
    setup_future_usage: 'off_session',
    customer: customerId,
    confirmation_method: 'manual',
    ...(reason === PAYMENT_REASON.ACCEPT_BOOKING && {
      transfer_group: bookingId,
    }),
  });

  if (promoDoc) {
    await client.query(
      q.Create(q.Collection('User_PromoCode'), {
        data: {
          user: activeUserRef,
          promoCode: promoDoc.ref,
        },
      })
    );
  }

  const redirectUrl = nextAction && nextAction.use_stripe_sdk.stripe_js;

  return { id, redirectUrl };
};
