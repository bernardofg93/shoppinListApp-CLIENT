import { gql, useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const GET_PURCHASE = gql`
  query GetPurchaseUser($getPurchaseUserId: ID!) {
    getPurchaseUser(id: $getPurchaseUserId) {
      id
      user {
        id
        name
      }
      purchase {
        id
        name
        description
        price
      }
    }
  }
`;


const Index = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("idUser");
      if (userId) {
        const id = JSON.parse(userId);
        setId(id);
      }
    }
  }, [id, GET_PURCHASE]);

  console.log(id);

  const router = useRouter();

  // const userId = () => {
  //   if (typeof window !== "undefined") {
  //     const idUser = localStorage.getItem("idUser");
  //     if (idUser) {
  //       const id = JSON.parse(idUser);
  //       return id
  //     }
  //   }
  // }

  // const id = userId();

  const { data, loading, error } = useQuery(GET_PURCHASE, {
    variables: {
      getPurchaseUserId: id,
    },
  });

  if (loading) return "cargando ...";


  const createOrder = () => {
    Router.push("/crearcompra");
  };

  return (
    <div>
      <Layout>
        <div className="flex justify-between">
          <h2 className="text-2xl text-gray-900 font-light">Mis compras</h2>
          <button
            type="button"
            className="bg-emerald-800 rounded p-2 text-white font-bold shadow-md"
            onClick={() => createOrder()}
          >
            Crear compra
          </button>
        </div>

        {data?.getPurchaseUser.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
        ) : data?.getPurchaseUser ? (
          <div className="w-full p-5 mt-5 grid gap-3 grid-cols-4 grid-rows-4">
            {data?.getPurchaseUser.map((item) => (
              <>
                <div
                  key={item.id}
                  className="bg-slate-100 w-80 shadow-lg rounded p-5 mr-2"
                >
                  <div className="flex">
                    <strong className="mr-2">Nombre:</strong>
                    <p>{item.user.name}</p>
                  </div>
                  <div>
                    {item?.purchase.map((item) => (
                      <div key={item.id}>
                        <div className="flex">
                          <strong className="mr-2">Articulo:</strong>
                          <p>{item.name}</p>
                        </div>
                        <div className="flex">
                          <strong className="mr-2">Descripcion:</strong>
                          <p>{item.description}</p>
                        </div>
                        <div className="flex">
                          <strong className="mr-2">Precio:</strong>
                          <p>{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <>
            <p>cargando...</p>
          </>
        )}
      </Layout>
    </div>
  );
};

export default Index;
