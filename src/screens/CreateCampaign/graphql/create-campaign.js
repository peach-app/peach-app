import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $private: Boolean!
    $description: String!
    $dueDate: String!
    $budget: String!
  ) {
    createCampaign(
      name: $name
      private: $private
      description: $description
      dueDate: $dueDate
      budget: $budget
    ) {
      _id
    }
  }
`;
