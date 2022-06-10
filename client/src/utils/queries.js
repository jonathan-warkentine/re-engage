import {gql} from "@apollo/client";

export const QUERY_READERS = gql`
  query allReaders {
    readers {
      _id
      name
    }
  }
`;

export const QUERY_MY_CONTRIBUTIONS = gql`
  query myContributions {
    myPassages {
      _id
      title
      providedBy {
        _id
        name
      }
      fullBody
      splitBody {
        text
        key
        words {
          key
          partOfSpeech
          text
          display
        }
      }
    }
  }
`;

export const QUERY_ALL_PASSAGES = gql`
  query allPassages {
    passages {
      _id
      title
      providedBy {
        name
        _id
      }
      fullBody
      splitBody {
        words {
          key
          partOfSpeech
          text
          display
        }
        key
        text
      }
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
  query Me {
    me {
      _id
      name
      sessions {
        _id
        readerId
        passage {
          _id
          title
        }
        resumeAt
      }
      passages {
        _id
        title
      }
    }
  }
`;
