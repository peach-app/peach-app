import React from "react";
import { Platform, SafeAreaView, Text } from "react-native";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/fp/get";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Card from "./components/Card";
import Container from "./components/Container";

const client = new ApolloClient({
  uri: Platform.select({
    web: "/.netlify/functions/graphql",
    ios: "http://localhost:8888/.netlify/functions/graphql",
    android: "http://localhost:8888/.netlify/functions/graphql"
  }),
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0NDk0NzQyNzQ5MjEwMjY1OCIsImlhdCI6MTU2OTg1ODkyMH0.G1rttPwhJrf-ZVn_Rby4wsmFY8PGRVWnLB5e-37tcSM`
  }
});

const Home = ({ navigation }) => {
  const { data, loading } = useQuery(gql`
    {
      user {
        email
      }
    }
  `);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView>
      <Container>
        <Card>
          <Text>{get("user.email", data)}</Text>
        </Card>
      </Container>
    </SafeAreaView>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home
  },
  {
    headerMode: "none"
  }
);

const App = createAppContainer(AppNavigator);

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
