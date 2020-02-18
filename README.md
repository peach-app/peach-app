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

6. In terminal run: `export FAUNADB_SECRET=YourFaunaSecretKey`

7. Then run: `npm run deploy:db`

8. Head back to the "Security" tab in fauna

9. Create a new key, with the role set to "auth"

10. Replace the "Authorization" token within ./src/apollo-client.js with the new token

![Auth Token](/docs/assets/auth-token.png)

## Run Development

1. Run expo: `expo start`

2. Open a new tab

3. Then run the GraphQL lambda: `netlify dev`

## Production Deploy

`npm run deploy:prod`

## URLS

#### Marketing Site

https://peachapp.io/

#### App Site

https://dashboard.peachapp.io/
