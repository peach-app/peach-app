import gql from 'graphql-tag';

export default gql`
  mutation($pushToken: String, $preferences: PreferencesInput!) {
    updateUserPreferences(pushToken: $pushToken, preferences: $preferences)
  }
`;
