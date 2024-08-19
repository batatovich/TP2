import { gql } from '@apollo/client';

export const GET_OTHERS_EVENTS = gql`
  query OthersEvents {
    othersEvents {
      id
      name
      description
      location
      date
      capacity
      fee
      acceptedApplicationCount
      applications {
        id
        status
      }
      createdAt
    }
  }
`;

export const GET_MY_EVENTS = gql`
  query MyEvents {
    myEvents {
      id
      name
      description
      location
      date
      capacity
      fee
      acceptedApplicationCount
      createdAt
    }
  }
`;

export const GET_EVENT_APPLICATIONS = gql`
  query GET_EVENT_APPLICATIONS($eventId: ID!) {
    eventApplications(eventId: $eventId) {
      id
      user {
        email
      }
      status
    }
  }
`;
