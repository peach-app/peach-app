import React from "react";
import { Platform, SafeAreaView } from "react-native";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components/native";

const client = new ApolloClient({
  uri: Platform.select({
    web: "/.netlify/functions/graphql",
    ios: "http://localhost:8888/.netlify/functions/graphql",
    android: "http://localhost:8888/.netlify/functions/graphql"
  })
});

const Title = styled.Text`
  font-size: 60px;
`;

const Test = () => {
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
      <Title accessibilityRole="heading" aria-level="3">
        {data.hello}
      </Title>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Test />
    </ApolloProvider>
  );
}
