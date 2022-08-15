import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
    }
  }
`;

const Header = () => {
  const router = useRouter();

  const { data, loading } = useQuery(GET_USER, {
    variables: {},
  });

  if (loading) return "Cargando...";

  if (!data) {
    return router.push;
  }

  const { name, id } = data.getUser;

  localStorage.setItem("userId", id);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6 bg-sky-800 p-5 shadow-md">
      <p className="mr-2 text-white font-bold">Hola: {name}</p>
      <button
        className="bg-rose-600 w-full sm:w-auto font-bold 
            uppercase text-xs rounded py-2 px-2 text-white shadow-md"
        type="button"
        onClick={() => logOut()}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Header;
