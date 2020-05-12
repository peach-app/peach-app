const faunadb = require('faunadb');

const DocumentDataWithId = require('../../functions/helpers/DocumentDataWithId');
const { BOOKING_STATE } = require('../../functions/consts');
const sendMail = require('../../functions/helpers/sendMail');

const processPayments = require('./procesPayments');

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

  const [completedTransfers, failedTransfers] = await processPayments(
    completedBookingDetails.data
  );

  if (completedTransfers.length > 0) {
    console.log('\nUpdating booking collection..............');
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

  if (failedTransfers.length > 0) {
    console.log('\nLogging failed bookings..............');

    try {
      await client.query(
        q.Map(
          failedTransfers,
          q.Lambda(
            ['transfer'],
            q.Create(q.Collection('FailedBookingPayments'), {
              data: {
                bookingId: q.Select(['bookingId'], q.Var('transfer')),
                error: q.Select(['error'], q.Var('transfer')),
              },
            })
          )
        )
      );
      // for when we automate it
      await sendMail({
        to: 'rosendanew@gmail.com',
        subject: 'Failed booking payments alert!',
        text: `
        Alert! Alert! Alert!
        Problems with payments. 
        Please resolve.
        `,
      });
    } catch (e) {
      console.log('Failed Booking Payments collection update failed', e);
    }
  }

  console.log('\nDone!');
})().catch(e => {
  console.log('There was a problem while processing booking payouts', e);
});
