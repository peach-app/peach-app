const stripe = require('../helpers/stripe');

const processPayments = async completedBookingDetails => {
  const completedTransfers = [];
  const failedTransfers = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const details of completedBookingDetails) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const transfer = await stripe.transfers.create(
        {
          amount: details.booking.cost,
          currency: 'gbp',
          destination: details.user.stripeID,
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
  }
  return [completedTransfers, failedTransfers];
};

module.exports = processPayments;
