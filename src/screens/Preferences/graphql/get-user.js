import gql from 'graphql-tag';

export default gql`
  query getUserPreferences {
    user {
      _id
      preferences {
        pushAlerts
        emailAlerts
      }
    }
  }
`;
