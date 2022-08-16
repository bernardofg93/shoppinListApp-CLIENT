import { useRouter } from "next/router";
import React, { useState, useEffect, useReducer } from "react";
import Avatar from "./Avatar";

const Header = () => {

  const router = useRouter();

  const userName = () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const json = JSON.parse(userData);
        const { name } = json;
        return name
      }
    }
  }

  const name = userName();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("idUser");
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6 bg-sky-800 p-5 shadow-md">
      {userName() && <p className="mr-2 text-white font-bold">Hola: {name}</p>}
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
