import {gql} from "@apollo/client";

export const ADD_READER = gql`
  mutation addReader($name: String!, $email: String!, $password: String!) {
    addReader(name: $name, email: $email, password: $password) {
      token
      reader {
        _id
        name
      }
    }
  }
`;

export const LOGIN_READER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      reader {
        _id
        name
      }
    }
  }
`;

export const ADD_PASSAGE = gql`
  mutation addPassage($title: String, $authorId: ID, $fullText: String) {
    addPassage(title: $title, authorId: $authorId, fullText: $fullText) {
      _id
      title
      fullText
      author {
        name
        email
      }
    }
  }
`;

export const ADD_SESSION = gql`
  mutation addSession($passageId: ID!) {
    addSession(passageId: $passageId) {
      _id
      readerId
      resumeAt
    }
  }
`;

export const DELETE_PASSAGE = gql`
  mutation deletePassage($passageId: ID!) {
    deletePassage(passageId: $passageId) {
      _id
    }
  }
`;

export const UPDATE_PASSAGE = gql`
  mutation updatePassage($passageId: ID!, $title: String, $fullText: String) {
    updatePassage(passageId: $passageId, title: $title, fullText: $fullText) {
      _id
    }
  }
`;
