import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import Router, { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import Layout from "../components/Layout";

const USER_DATA = gql`
query GetUser {
  getUser {
    id
    name
  }
}
`;

const GET_USER = gql`
  query GetUserId($getUserIdId: ID!) {
    getUserId(id: $getUserIdId) {
      name
      address
      city
      country
      phone
      email
    }
  }
`;

const UPDATE_DATA = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UserInput) {
    updateUser(id: $updateUserId, input: $input) {
      name
      email
      address
      city
      country
      phone
    }
  }
`;

const MisDatos = () => {
  const router = useRouter();


  const {id} = router.query;


  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      getUserIdId: id,
    },
  });

  const [updateUser] = useMutation(UPDATE_DATA, {
    update(cache, {data: { updateUser }}){
      console.log("testing apollo",updateUser);
      const { getUserId } = cache.readQuery({
        query: GET_USER,
        variables: {
          getUserIdId: id
        }
      });
      cache.writeQuery({
        query: GET_USER,
        variables: {
          getUserIdId: id
        },
        data: {
          getUserId: updateUser
        }
      })
    },
    update(cache, {data: { updateUser }}){
      const { getUser } = cache.readQuery({
        query: USER_DATA
      });
      cache.writeQuery({
        query: USER_DATA,
        data: {
          getUser: {...getUser, name: updateUser.name }
        }
      })
    },
  });

  if (loading) return "Cargando...";

  const { getUserId } = data;


  // validate
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("El email no es valido")
      .required("El email es obligatorio"),
    address: Yup.string().required("El domicilio es obligatorio"),
    phone: Yup.string().required("El telefono es obligatorio"),
    country: Yup.string().required("El país es obligatorio"),
    city: Yup.string().required("La ciudad es obligatoria"),
  });

  // ubdate data in to db
  const updataData = async (values) => {
    const { name, email, address, city, country, phone } = values;

    try {
      const { data } = await updateUser({
        variables: {
          updateUserId: id,
          input: {
            name,
            email,
            address,
            city,
            country,
            phone,
          },
        },
      });

      console.log(data);
      // Alert

      // redirec
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-center text-2xl text-sky-800 font-medium uppercase">
        Actualizar Mis datos
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={getUserId}
            onSubmit={(values) => {
              updataData(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.name && props.errors.name ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
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
                      value={props.values.address}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.address && props.errors.address ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.address}</p>
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
                      value={props.values.country}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.country && props.errors.country ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.country}</p>
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
                      value={props.values.city}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.city && props.errors.city ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.city}</p>
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
                      value={props.values.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.phone && props.errors.phone ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.phone}</p>
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
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.email && props.errors.email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
                    </div>
                  ) : null}
                  <input
                    type="submit"
                    className="bg-sky-800 w-full mt-5 p-2 py-3 text-white rounded uppercase 
                    hover:bg-sky-700 cursor-pointer font-bold"
                    value="Editar datos"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default MisDatos;
