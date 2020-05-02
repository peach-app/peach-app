const faunadb = require('faunadb');
const DocumentDataWithId = require('../helpers/DocumentDataWithId');
const { BOOKING_STATE } = require('../consts');
const stripe = require('../helpers/stripe');

const q = faunadb.query;

(async () => {
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

  console.log(
    '\nRetrieving the completed bookings awaiting payment..............'
  );
  const completedBookingDetails = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('booking_by_state'), BOOKING_STATE.COMPLETE)),
      q.Lambda('ref', {
        user: q.Select(
          ['data'],
          q.Get(q.Select(['user'], DocumentDataWithId(q.Get(q.Var('ref')))))
        ),
        campaign: q.Select(
          ['data'],
          q.Get(q.Select(['campaign'], DocumentDataWithId(q.Get(q.Var('ref')))))
        ),
        booking: DocumentDataWithId(q.Get(q.Var('ref'))),
      })
    )
  );

  console.log('\nProcessing payments..............');

  const completedTransfers = [];
  const failedTransfers = [];

  const processPayment = async details => {
    try {
      const transfer = await stripe.transfers.create({
        amount: details.booking.cost,
        currency: 'gbp',
        destination: details.user.stripeID,
      });

      completedTransfers.push({
        bookingId: details.booking._id,
        transferId: transfer.id,
      });
    } catch (error) {
      console.log(`\nPayment failed for booking: ${details.booking._id} `);

      failedTransfers.push({ bookingId: details.booking._id, error });
    }
  };

  Promise.all(completedBookingDetails.data.map(processPayment));

  console.log('\nUpdating booking collection..............');
  if (completedTransfers.length > 0) {
    try {
      await client.query(
        q.Map(
          completedTransfers,
          q.Lambda(
            ['transfer'],
            q.Update(
              q.Ref(
                q.Collection('Booking'),
                q.Select(['bookingId'], q.Var('transfer'))
              ),
              {
                data: {
                  transferId: q.Select(['transferId'], q.Var('transfer')),
                },
              }
            )
          )
        )
      );
    } catch (e) {
      console.log('Booking collection update failed', e);
    }
  }
})().catch(e => {
  console.log('There was a problem while processing booking payouts', e);
});
