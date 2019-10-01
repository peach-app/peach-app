import ApolloClient from "apollo-boost";
import { Platform } from "react-native";

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

export default client;
