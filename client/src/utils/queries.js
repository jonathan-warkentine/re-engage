import { gql } from '@apollo/client';

export const QUERY_READERS = gql`
  query allReaders {
    readers {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleReader($readerId: ID!) {
    reader(readerId: $readerId) {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;
