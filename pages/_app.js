import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider>
  )
};

export default MyApp;
