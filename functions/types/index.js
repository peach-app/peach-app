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
    ): Auth
    sendMessage(threadId: ID!, text: String!): Message
    applyToCampaign(id: ID!, cost: Int!): Booking
    updateBookingState(id: ID!, state: BookingState!): Boolean
    updateUser(user: UserInput): Boolean
    completeOnboarding: Boolean
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
  }

  type User {
    _id: ID!
    name: String
    bio: String
    avatar: Media
    email: String!
    onboarded: Boolean

    type: UserType!

    # User created Campaigns
    campaigns: CampaignPage

    # User applications/requests to
    # join Campaigns
    bookings: BookingPage

    # Inbox thread listing
    threads: ThreadPage
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
    cost: Int!
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
`;
