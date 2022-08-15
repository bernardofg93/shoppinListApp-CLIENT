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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevousuario" ? (
        <div className="bg-sky-700 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />

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
