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
  mutation addPassage($title: String, $providedBy: ID, $fullText: String) {
    addPassage(title: $title, providedBy: $providedBy, fullText: $fullText) {
      _id
      title
      fullText
      providedBy {
        name
        email
      }
    }
  }
`;
