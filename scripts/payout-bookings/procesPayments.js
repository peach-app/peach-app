const stripe = require('../../functions/helpers/stripe');

const processPayments = async completedBookingDetails => {
  const completedTransfers = [];
  const failedTransfers = [];

  await Promise.all(
    completedBookingDetails.map(async details => {
      try {
        const transfer = await stripe.transfers.create(
          {
            amount: details.booking.cost,
            currency: 'gbp',
            destination: details.user.stripeID,
            transfer_group: details.booking._id,
          },
          {
            idempotencyKey: details.booking._id,
          }
        );

        completedTransfers.push({
          bookingId: details.booking._id,
          transferId: transfer.id,
        });
      } catch (error) {
        console.log(`\nPayment failed for booking: ${details.booking._id} `);
        failedTransfers.push({ bookingId: details.booking._id, error });
      }
    })
  );

  return [completedTransfers, failedTransfers];
};

module.exports = processPayments;
