import React from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Avatar from "./Avatar";

const Sidebar = () => {
  // routing
  const router = useRouter();

  const userId = () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const json = JSON.parse(userData);
        const { id } = json;
        return id;
      }
    }
  };

  const id = userId();

  const editMyData = (id) => {
    Router.push({
      pathname: "/editarmisdatos/[id]",
      query: { id },
    });
  };

  const myShoppingList = (id) => {
    Router.push({
      pathname: "/miscompras/[id]",
      query: { id },
    });
  }

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
            <a className="text-white font-medium mb-3 block">Pedidos</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-sky-800 p-2" : "p-2"}
        >
          <button onClick={() => editMyData(id)}>
            <a className="text-white mb-3 block font-medium ">Mis datos</a>
          </button>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-sky-800 p-2" : "p-2"}
        >
          <button onClick={() => myShoppingList(id)}>
            <a className="text-white mb-3 block font-medium ">Mis compras</a>
          </button>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
