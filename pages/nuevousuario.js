import { useFormik } from "formik";
import React, { useState } from "react";
import Layout from "../components/Layout";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const NEW_USER = gql`
  mutation NewUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      email
      address
      phone
      country
      city
    }
  }
`;

const NuevaCuenta = () => {
  // state para el mensaje
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos usuarios
  const [newUser] = useMutation(NEW_USER);

  //routing
  const router = useRouter();

  // Validacion del formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      country: "",
      city: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password no puede ir vacio")
        .min(6, "El password debe contener almenos 6 caracteres"),
      address: Yup.string().required("El domicilio es obligatorio"),
      phone: Yup.string().required("El telefono es obligatorio"),
      country: Yup.string().required("El país es obligatorio"),
      city: Yup.string().required("La ciudad es obligatoria"),
    }),
    onSubmit: async (values) => {
      //   console.log("enviando");
      //   console.log(valores);
      const { name, email, address, phone, country, city, password } = values;

      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              email,
              address,
              phone,
              country,
              city,
              password,
            },
          },
        });

        //usuario creado correctamente
        guardarMensaje(
          `Se creo correctamente el Usuario: ${data.newUser.name}`
        );
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/login");
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
          Crear Nueva Cuenta
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
                  htmlFor="name"
                >
                  nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="name"
                  placeholder="Nombre:"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Domicilio
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="address"
                  placeholder="Direccion:"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.address && formik.errors.address ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.address}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  país
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="country"
                  type="country"
                  placeholder="país:"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.country && formik.errors.country ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.country}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  ciudad
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="city"
                  placeholder="ciudad:"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.city && formik.errors.city ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.city}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Telefono
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="phone"
                  placeholder="Telefono:"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.phone}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                className="bg-sky-800 w-full mt-5 p-2 text-white uppercase hover:bg-sky-700 cursor-pointer"
                value="Crear cuenta"
              />
                            <Link href="/login">
                <a className="text-sky-900 mt-3 block font-bold underline">Iniciar sesion</a>
              </Link>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NuevaCuenta;
