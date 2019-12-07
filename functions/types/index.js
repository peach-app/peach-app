const gql = require('graphql-tag');

module.exports = gql`
  type Query {
    user: User
    # Discover campaigns listing
    discover: Discover

    # Campaigns listing
    campaigns(state: BookingState): CampaignPage

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
    applyToCampaign(id: ID!): Booking
    updateBookingState(id: ID!, state: BookingState!): Boolean
    updateUser(name: String): Boolean
  }

  type Discover {
    campaigns: CampaignPage
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

  type User {
    _id: ID!
    name: String
    avatar: Media
    email: String!

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
    messages: MessagePage
    latestMessage: Message
  }

  type MessagePage {
    data: [Message]
  }

  type Message {
    _id: ID!
    user: User!
    text: String!
    sentBySelf: Boolean
  }
`;
