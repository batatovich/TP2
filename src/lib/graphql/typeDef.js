const typeDefs = `#graphql
  type Query {
    users: [User!]
    user(id: ID!): User
    events(userId: ID): [Event!]
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(name: String!, description: String!, location: String!, date: String!, capacity: Int!, fee: Float!): Event
    deleteEvent(id: ID!): Event
  }

  type User {
    id: ID!
    email: String!
    password: String!
    events: [Event]
    applications: [Application]
    createdAt: String!
    updatedAt: String!
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
    applications: [Application]
    createdAt: String!
    updatedAt: String!
  }

  type Application {
    id: ID!
    status: String!
    event: Event!
    user: User!
    createdAt: String!
  }
`;

export default typeDefs;