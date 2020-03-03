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

    findCampaignById(id: ID): Campaign
    findThreadById(id: ID!): Thread
    findUserByID(id: ID!): User

    searchUsers(type: UserType!, query: String!): UserPage
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(
      name: String!
      email: String!
      password: String!
      type: UserType!
      idempotencyKey: String!
      emailVerificationToken: String!
    ): Auth
    sendMessage(threadId: ID!, text: String!): Message
    createCampaign(campaign: CampaignInput): Campaign
    applyToCampaign(id: ID!, cost: Int!): Booking
    updateBookingState(id: ID!, state: BookingState!): Boolean
    updateUser(user: UserInput): Boolean
    completeOnboarding: Boolean
    requestInfluencers(requestedInfluencers: [ID!], campaignId: ID!): Boolean
    createBillingMethod(token: String!): Boolean
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
    campaigns(size: Int, after: [RefInput], before: [RefInput]): CampaignPage
    popularUsers(type: UserType!): UserPage
  }

  type Auth {
    secret: String!
  }

  type Media {
    url: String!
  }

  enum UserType {
    BRAND
    INFLUENCER
  }

  type UserPage {
    data: [User]
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

    # User created Campaigns
    campaigns: CampaignPage

    # User applications/requests to
    # join Campaigns
    bookings: BookingPage

    # Inbox thread listing
    threads: ThreadPage

    stripeAccount: StripeAccount
  }

  type UserEmailVerification {
    hasVerifiedEmail: Boolean
    token: String
  }

  type StripeAccount {
    id: String!
    charges_enabled: Boolean
    transfers_enabled: Boolean
    individual: StripePerson
    external_accounts: ExternalAccountsPage
  }

  type ExternalAccountsPage {
    data: [ExternalAccount]
  }

  type ExternalAccount {
    id: ID!
    last4: String
    routing_number: String
    account_holder_name: String
    object: String
  }

  type StripePerson {
    id: ID!
    first_name: String
    last_name: String
    address: Address
    dob: DateOfBirth
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
    budget: Float
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
    state: BookingState!
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
    name: String!
    description: String!
    dueDate: String!
    private: Boolean!
    budget: String!
  }
`;
