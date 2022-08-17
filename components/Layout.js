import Head from "next/head";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Header from "./Header";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($token: String!) {
    getUser(token: $token) {
      id
      name
    }
  }
`;

const Layout = ({ children, hola }) => {
  console.log(hola);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("token");
      setId(id);
    }
  }, []);

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      token: id,
    },
  });

  if (loading) return "cargando..";

  if (data) {
    const user = JSON.stringify(data.getUser);
    const id = JSON.stringify(data.getUser.id);
    localStorage.setItem("userData", user);
    localStorage.setItem("idUser", id);
  }

  return (
    <>
      <Head>
        <title>Test - Bernardo Flores</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevousuario" ? (
        <div className="bg-sky-700 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar userData={data} />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen">
              <Header />
              <div className="p-5">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
