import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $description: String!
    $dueDate: String!
    $private: Boolean!
    $budget: String!
  ) {
    createCampaign(
      name: $name
      description: $description
      dueDate: $dueDate
      private: $private
      budget: $budget
    ) {
      _id
    }
  }
`;
