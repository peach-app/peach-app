const gql = require('graphql-tag');

module.exports = gql`
  type Query {
    user: User
    # Discover campaigns listing
    discover: [Campaign]

    # Campaigns listing
    campaigns: [Campaign]

    findCampaignByID(id: ID): Campaign

    # Inbox threads
    threads: [Thread]
    threadMessages(threadId: ID!): [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    register(email: String!, password: String!, type: UserType!): Auth
    createMessage(threadId: ID!, text: String!): Message
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

  type User {
    _id: ID!
    name: String
    avatar: Media
    email: String!

    type: UserType!

    # User created Campaigns
    campaigns: [Campaign]

    # User applications/requests to
    # join Campaigns
    bookings: [Booking]

    threads: [Thread]
  }

  type Campaign {
    _id: ID!
    # the brand who created the campaign
    user: User

    name: String
    description: String
    private: Boolean
    budget: Float
    bookings: [Booking]
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

  type Booking {
    _id: ID!
    campaign: Campaign!
    user: User!
    cost: Float!
    state: BookingState!
  }

  type Thread {
    _id: ID!
    users: [User]
    messages: [Message]
    latestMessage: Message
  }

  type Message {
    _id: ID!
    thread: Thread!
    user: User!
    text: String!
  }
`;
