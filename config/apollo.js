import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import fetch from "node-fetch";

const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    // uri: 'https://ber-instancione-app.herokuapp.com/',
    fetch
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
         "apollo-require-preflight": "*",
          authorization: token ? `Bearer ${token}` : ''
        }
    }
});
const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
})

export default client;  



