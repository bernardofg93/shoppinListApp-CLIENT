import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/index.css";
import PurchaseState from "../context/PurchaseState";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <PurchaseState>
       <Component {...pageProps} />
      </PurchaseState>
    </ApolloProvider>
  );
};

export default MyApp;
