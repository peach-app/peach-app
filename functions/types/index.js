const gql = require('graphql-tag');

module.exports = gql`
  type Query {
    user: User
    # Discover campaigns listing
    discover: Discover

    # Campaigns listing
    campaigns(
      state: BookingState
      size: Int
      after: [RefInput]
      before: [RefInput]
    ): CampaignPage

    findCampaignsWithoutUserBookings(
      id: ID!
      size: Int
      after: [RefInput]
      before: [RefInput]
    ): CampaignPage

    findCampaignsByBrand(
      id: ID
      size: Int
      after: [RefInput]
      before: [RefInput]
    ): CampaignPage

    findCampaignById(id: ID): Campaign
    findThreadById(id: ID!): Thread
    findUserByID(id: ID!): User

    searchUsers(type: UserType!, query: String!, campaignId: String): UserPage
    getPaymentConfirmationStatus(id: ID!): PaymentIntent

    payouts(size: Int, after: ID, before: ID): PayoutsPage

    categories: [Category]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(
      name: String!
      email: String!
      password: String!
      type: UserType!
      idempotencyKey: String!
    ): Auth
    sendMessage(threadId: ID!, text: String!): Message
    createOrUpdateCampaign(campaign: CampaignInput): Campaign
    applyToCampaign(id: ID!, cost: Int): Booking
    updateBookingState(
      id: ID!
      state: BookingState!
      paymentId: String
    ): Boolean
    updateUser(user: UserInput): Boolean
    updateUserPreferences(
      pushToken: String
      preferences: PreferencesInput!
    ): Boolean
    completeOnboarding: Boolean
    requestInfluencers(requestedInfluencers: [ID!], campaignId: ID!): Boolean
    createBillingMethod(token: String!): Boolean
    createPaymentMethod(token: String!): Boolean
    verifyEmail(emailVerificationToken: String!): Boolean
    updateUserAvatar(media: MediaInput!): Boolean
    requestInfluencerToCampaigns(influencerId: ID!, campaigns: [ID!]): Boolean
    createOrUpdateSocialAccounts(socialAccounts: SocialAccountsInput): Boolean
    completeBooking(id: ID!, note: String): Boolean
    requestPasswordReset(email: String!): Boolean
    resetPassword(userId: ID!, password: String!): Boolean
    createPayment(
      reason: PaymentReason!
      bookingId: ID
      token: String
      selectedId: String
    ): PaymentIntent
    declineBooking(campaignId: ID): Boolean
    addWorkSample(media: MediaInput!): Boolean
    deleteWorkSample(id: ID!): Boolean
  }

  # Fauna references #
  type Collection {
    id: ID
  }

  type Ref {
    id: ID
    collection: Collection
  }

  input CollectionInput {
    id: ID
  }

  input RefInput {
    id: ID
    collection: CollectionInput
  }
  # //////////////// #

  type Discover {
    campaigns(
      size: Int
      after: [RefInput]
      before: [RefInput]
      type: BudgetType
    ): CampaignPage
    popularUsers(type: UserType!): UserPage
  }

  type Auth {
    secret: String!
  }

  type Media {
    url(options: String): String!
  }

  enum BudgetType {
    PAID
    UNPAID
  }

  enum UserType {
    BRAND
    INFLUENCER
  }

  enum PaymentReason {
    CREATE_CAMPAIGN
    ACCEPT_BOOKING
  }

  type UserPage {
    data: [User]
  }

  input MediaInput {
    id: ID!
    format: String!
  }

  input PreferencesInput {
    pushAlerts: Boolean
    emailAlerts: Boolean
  }

  input UserInput {
    name: String
    bio: String
    firstName: String
    lastName: String
    email: String
    dob: String
    addressLine1: String
    addressLine2: String
    city: String
    postalCode: String
    categories: [ID]
  }

  input SocialAccountsInput {
    instagram: String
    twitter: String
    facebook: String
    youTube: String
    tikTok: String
  }

  type SocialAccounts {
    instagram: String
    twitter: String
    facebook: String
    youTube: String
    tikTok: String
  }

  type User {
    _id: ID!
    name: String
    bio: String
    avatar: Media
    email: String!
    onboarded: Boolean
    emailVerification: UserEmailVerification
    type: UserType!
    pushToken: String
    preferences: Preferences

    # User created Campaigns
    campaigns: CampaignPage

    # User applications/requests to
    # join Campaigns
    bookings: BookingPage

    # Inbox thread listing
    threads: ThreadPage

    stripeAccount: StripeAccount

    hasSocialAccounts: Boolean
    socialAccounts: SocialAccounts

    payouts: PayoutsPage

    workSamples: [WorkSample]

    categories: [Category]
  }

  type WorkSample {
    _id: ID!
    media: Media
  }

  type Category {
    _id: ID!
    name: String
  }

  type Preferences {
    pushAlerts: Boolean
    emailAlerts: Boolean
  }

  type PayoutsPage {
    has_more: Boolean
    data: [Payout]
  }

  type PayoutPaymentMethod {
    card: StripeCard
  }

  type Payout {
    id: ID
    amount: Int
    created: Int
    amount_refunded: Int
    status: String
    payment_method_details: PayoutPaymentMethod
  }

  type UserEmailVerification {
    isVerified: Boolean
  }

  type StripeAccount {
    id: String!
    individual: StripePerson
    external_accounts: BillingMethodPage
    paymentMethods: BillingMethodPage
    capabilities: StripeCapabilities
  }

  type StripeCapabilities {
    transfers: String
  }

  type BillingMethodPage {
    data: [BillingMethod]
  }

  type BillingMethod {
    id: ID!
    last4: String
    routing_number: String
    account_holder_name: String
    object: String
    card: StripeCard
  }

  type StripeCard {
    last4: String
    brand: String
    funding: String
  }

  type StripePerson {
    id: ID!
    first_name: String
    last_name: String
    address: Address
    dob: DateOfBirth
  }

  type PaymentIntent {
    id: ID
    redirectUrl: String
    status: String
  }

  type Address {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
  }

  type DateOfBirth {
    day: String
    month: String
    year: String
  }

  type CampaignPage {
    pendingBookingsToAction: Int
    data: [Campaign]
    after: [Ref]
    before: [Ref]
  }

  type Campaign {
    _id: ID!
    # the brand who created the campaign
    user: User

    name: String
    description: String
    private: Boolean
    unpaid: Boolean
    budget: Int
    bookings(state: BookingState): BookingPage
    userBooking: Booking
    dueDate: String
  }

  enum BookingState {
    ALL
    ACCEPTED
    DECLINED
    COMPLETE

    # For when an influencer applies
    # to a campaign
    APPLIED

    # For when an brand requests
    # an influencer onto a campaign
    REQUESTED
  }

  type BookingPage {
    data: [Booking]
  }

  type Booking {
    _id: ID!
    campaign: Campaign!
    user: User!
    cost: Int
    unpaid: Boolean
    state: BookingState!
    note: String
  }

  type ThreadPage {
    data: [Thread]
  }

  type Thread {
    _id: ID!
    users: UserPage
    messages(size: Int, after: Float, before: Float): MessagePage
    latestMessage: Message
  }

  type MessagePage {
    data: [Message]
    after: Float
    before: Float
  }

  type Message {
    _id: ID!
    user: User!
    text: String!
    sentBySelf: Boolean
  }

  input CampaignInput {
    _id: ID
    name: String!
    description: String!
    dueDate: String
    private: Boolean
    unpaid: Boolean
    budget: Int
  }
`;
