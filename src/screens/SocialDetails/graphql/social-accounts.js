import gql from 'graphql-tag';

export const CREATE_OR_UPDATE_SOCIAL_ACCOUNTS = gql`
  mutation($socialAccounts: SocialAccountsInput) {
    createOrUpdateSocialAccounts(socialAccounts: $socialAccounts)
  }
`;

export const GET_USER_SOCIAL_ACCOUNTS = gql`
  query getUserSocialAccounts {
    user {
      _id
      socialAccounts {
        instagram
        twitter
        facebook
        youTube
        tickTok
      }
    }
  }
`;
