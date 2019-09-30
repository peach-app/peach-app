import React from "react";
import { Platform, SafeAreaView, Button, Text } from "react-native";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Card from "./components/Card";
import Container from "./components/Container";

const client = new ApolloClient({
  uri: Platform.select({
    web: "/.netlify/functions/graphql",
    ios: "http://localhost:8888/.netlify/functions/graphql",
    android: "http://localhost:8888/.netlify/functions/graphql"
  })
});

const Home = ({ navigation }) => {
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView>
      <Container>
        <Card>
          <Text>{data.hello}</Text>
        </Card>
      </Container>

      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
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
