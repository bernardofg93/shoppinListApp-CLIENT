import Head from "next/head";
import React from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Header from "./Header";

const Layout = ({ children }) => {

  const router = useRouter();

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
            <Sidebar/>

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen">
              <Header/>
              <div className="p-5">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
