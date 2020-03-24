import { BOOKING_STATE } from 'consts';

export const INFLUENCER_NO_BOOKING = {
  [BOOKING_STATE.ACCEPTED]: "You haven't been accepted onto any campaigns yet.",
  [BOOKING_STATE.APPLIED]: "You haven't applied to any campaigns yet.",
  [BOOKING_STATE.REQUESTED]:
    "You haven't been requested onto any campaigns yet.",
  [BOOKING_STATE.COMPLETE]: "You haven't complete any campaigns yet",
};
