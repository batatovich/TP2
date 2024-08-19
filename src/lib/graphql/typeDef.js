const typeDefs = `#graphql
  type Query {
    users: [User!]
    user(id: ID!): User
    myEvents: [Event!]
    othersEvents: [Event!]
  }

  type Mutation {
    createEvent(name: String!, description: String!, location: String!, date: String!, capacity: Int!, fee: Float!): Event
    deleteEvent(id: ID!): Boolean
    applyToEvent(id: ID!): Boolean
    cancelApplication(id: ID!): Boolean
  }

  type User {
    id: ID!
    email: String!
    password: String!
    createdAt: String!
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    location: String!
    date: String!
    capacity: Int!
    fee: Float!
    creator: User!
    createdAt: String!
    acceptedApplicationCount: Int!      # Number of applications for this event
    applications: [Application!]  # Include applications only when requested
  }

  type Application {
    id: ID!
    status: ApplicationStatus!
    event: Event!
    user: User!
    createdAt: String!
  }

  enum ApplicationStatus {
  PENDING
  ACCEPTED
  REJECTED
  CANCELED
}
`;

export default typeDefs;