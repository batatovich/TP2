import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!,
    $description: String!,
    $location: String!,
    $date: String!,
    $capacity: Int!,
    $fee: Float!
  ) {
    createEvent(
      name: $name,
      description: $description,
      location: $location,
      date: $date,
      capacity: $capacity,
      fee: $fee
    ) {
      id
      name
      description
      location
      date
      capacity
      fee
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const APPLY_TO_EVENT = gql`
  mutation ApplyToEvent($id: ID!) {
      applyToEvent(id: $id)
  }
`;

export const CANCEL_APPLICATION = gql`
  mutation CancelApplication($id: ID!) {
    cancelApplication(id: $id)
  }
`;