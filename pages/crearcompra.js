import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import PurchaseContext from "../context/PurchaseContext";

const NEW_PRODUCT = gql`
  mutation NewProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      description
      price
    }
  }
`;

const NEW_PURCHASE = gql`
  mutation NewPurchase($input: PurchaseInput) {
    newPurchase(input: $input) {
      id
      purchase {
        id
      }
    }
  }
`;

const GET_PURCHASE = gql`
  query GetPurchaseUser($getPurchaseUserId: ID!) {
    getPurchaseUser(id: $getPurchaseUserId) {
      id
      purchase {
        id
      }
    }
  }
`;

const CreatePurchase = ({ userData }) => {
  // Context get user id
  const purchaseContext = useContext(PurchaseContext);

  const { user } = purchaseContext;

  // state para el mensaje
  const [mensaje, guardarMensaje] = useState(null);
  const [products, setProduts] = useState([]);

  // Get purchase for ID
  const { data, loading, error } = useQuery(GET_PURCHASE, {
    variables: {
      getPurchaseUserId: user?.id,
    },
  });

  // Mutation para crear nuevos usuarios
  const [newProduct] = useMutation(NEW_PRODUCT);

  //Mutation an update
  const [newPurchase] = useMutation(NEW_PURCHASE, {
    update(cache, { data: { newPurchase } }) {
      const { getPurchaseUser } = cache.readQuery({
        query: GET_PURCHASE,
        variables: {
          getPurchaseUserId: user?.id,
        },
      });
      cache.writeQuery({
        query: GET_PURCHASE,
        variables: {
          getPurchaseUserId: user?.id,
        },
        data: {
          getPurchaseUser: [newPurchase, ...getPurchaseUser],
        },
      });
    },
  });

  //routing
  const router = useRouter();

  // Validacion del formulario
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      description: Yup.string().required("La descripcion es obligatoria"),
      price: Yup.number().required("El precio es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { name, description, price } = values;

      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              description,
              price,
            },
          },
        });

        const prod = data.newProduct;

        setProduts([...products, prod]);
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error", ""));

        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
      }
      setRefresh(true);
    },
  });

  const generatePurchase = async () => {
    // delete items array
    const purchase = products.map(({ __typename, ...products }) => products);

    try {
      const { data } = await newPurchase({
        variables: {
          input: {
            purchase,
            user: user?.id,
          },
        },
      });

      // console.log(data);
      router.push({
        pathname: "/miscompras",
        query: { id: user?.id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = (id) => {
    const newProducts = products.filter((item) => item.id != id);
    setProduts(newProducts);
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        {mensaje}
      </div>
    );
  };

  return (
    <>
      {mensaje && mostrarMensaje()}
      <h1 className="text-center text-2xl text-gray-900 font-medium uppercase">
        Generar compra
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
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Descripcion
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Descripcion:"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 
                      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="precio:"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-sky-800 w-full mt-3 p-2 text-white
                font-bold py-3 rounded
                uppercase hover:bg-sky-700 cursor-pointer"
              value="Agregar Articulo"
            />
          </form>
        </div>
      </div>

      <div className="flex justify-center py-6">
        {!products || products.length === 0 ? (
          <></>
        ) : (
          <button
            className="bg-amber-600 px-4 py-2 text-white font-bold rounded shadow-md uppercase"
            onClick={() => generatePurchase()}
          >
            Generar compra
          </button>
        )}
      </div>

      <table className="table-auto shadow-md w-full w-lg">
        <thead className="bg-sky-900">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">descripcion</th>
            <th className="w-1/5 py-2">precio</th>
            <th className="w-1/5 py-2">Eliminar</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {products.map((producto) => (
            <tr key={producto.id}>
              <td className="border px-4 py-2">{producto.name}</td>
              <td className="border px-4 py-2">{producto.description}</td>
              <td className="border px-4 py-2">{producto.price}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-600 p-3 rounded shadow-md text-white font-bold"
                  onClick={() => deleteProduct(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CreatePurchase;
