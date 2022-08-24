import { useRouter } from "next/router";
import React, { useContext } from "react";
import client from "../config/apollo";
import PurchaseContext from "../context/PurchaseContext";

const Header = () => {
  const purchaseContext = useContext(PurchaseContext);

  const { user } = purchaseContext;

  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
    client.clearStore();
  };

  return (
    <div className="flex justify-between mb-6 bg-sky-800 p-5 shadow-md">
      {user?.name && (
        <p className="mr-2 text-white font-bold">Hola: {user.name}</p>
      )}
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
