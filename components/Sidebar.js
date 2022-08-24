import React, {useContext} from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Avatar from "./Avatar";
import PurchaseContext from "../context/PurchaseContext";

const Sidebar = () => {

  const purchaseContext = useContext(PurchaseContext);

  const { user } = purchaseContext;
  
  const router = useRouter();

  return (
    <aside className="bg-sky-900 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 shadow-lg">
      <div className="w-full flex justify-center">
        {/* <p className="text-white text-2xl font-black">App</p> */}
        <Avatar />
      </div>

      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === "/" ? "bg-sky-800 p-2 shadow-md" : "p-2"
          }
        >
          <Link href="/">
            <a className="text-white font-medium mb-3 block">Nueva compra</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-sky-800 p-2" : "p-2"}
        >
          <Link
            href={{
              pathname: "/misdatos",
              query: { id: user?.id },
            }}
          >
            <a className="text-white mb-3 block font-medium ">Mis datos</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-sky-800 p-2" : "p-2"}
        >
          <Link
            href={{
              pathname: "/miscompras",
              query: { id: user?.id },
            }}
          >
            <a className="text-white mb-3 block font-medium ">Mis compras</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
