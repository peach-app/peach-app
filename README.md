# Peach

Influencer + Brand Collaboration

## Fauna Database Setup

1. Create a free fauna account:
   https://dashboard.fauna.com/accounts/register

2. Create a new Database

3. Open the database, go to the "Security" tab, and create a new admin key

![Security Tab](/docs/assets/security.png)

4. Take note of the key provided

![New Key](/docs/assets/key.png)

5. Go to the "GraphQL" tab, and upload the schema from ./fauna/schema.gql

![GraphQL Schema](/docs/assets/graphql.png)

6. In terminal run: `cd fauna`

7. Then: `export FAUNADB_SECRET=YourFaunaSecretKey`

8. Then: `node index`

9. Head back to the "Security" tab in fauna

10. Create a new key, with the role set to "auth"

11. Replace the "Authorization" token within ./src/apollo-client.js with the new token

![Auth Token](/docs/assets/auth-token.png)

## Run Development

`npm start`

## Production Deploy

`npm run deploy:prod`

## URLS

#### Marketing Site

https://peachapp.io/

#### App Site

https://dashboard.peachapp.io/
