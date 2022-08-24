import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import React, {useContext, useEffect} from "react";
import CreatePurchase from "./crearcompra";
import PurchaseContext from "../context/PurchaseContext";

const GET_USER = gql`
query GetUser {
  getUser {
    id
    name
    avatar
  }
}
`;

const Index = () => {

  const purchaseContext = useContext(PurchaseContext);
  const { setUserData, user } = purchaseContext;
  
  const { data, loading, error } = useQuery(GET_USER);
  

  useEffect(() => {
      setUserData(data?.getUser)
  }, [loading]);


  return (
      <Layout>
        <CreatePurchase />
      </Layout>
  );
};

export default Index;

