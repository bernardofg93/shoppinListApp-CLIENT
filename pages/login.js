import { useFormik } from "formik";
import React, { useState } from "react";
import Layout from "../components/Layout";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const AUTENTICATE_USER = gql`
  mutation AuthenticateUser($input: AutenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const [mensaje, guardarMensaje] = useState(null);
  //mutatitions para crear nuevos usuarios
  const [authenticateUser] = useMutation(AUTENTICATE_USER);

  //routing
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("el email no es valido")
        .required("El email no puede ser vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      //   console.log(valores);
      const { email, password } = valores;

      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        guardarMensaje("Autenticando....");

        //Guardae el token en localstorage
        const { token } = data.authenticateUser;
        localStorage.setItem("token", token);

        //Redireccionar al cliente
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/");
        }, 3000);
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error", ""));

        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        {mensaje}
      </div>
    );
  };

  return (
    <>
      <Layout>
        {mensaje && mostrarMensaje()}
        <h1 className="text-center text-2xl text-white font-light">
          Iniciar sesión
        </h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Correo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-sky-900 w-full mt-5 p-3 text-white uppercase hover:bg-gray-700 cursor-pointer"
                value="Iniciar sesion"
              />

              <Link href="/nuevousuario">
                <a className="text-sky-900 mt-3 block font-bold underline">Crear cuenta</a>
              </Link>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
