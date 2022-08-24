import React, { useCallback, useState, useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import PurchaseContext from "../context/PurchaseContext";

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      avatar
    }
  }
`;

const UPDATE_IMAGE = gql`
  mutation UpdateAvatar($file: Upload!) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Avatar = () => {
  const purchaseContext = useContext(PurchaseContext);

  const { user } = purchaseContext;

  const [updateAvatar] = useMutation(UPDATE_IMAGE, {
    update(cache, { data: { updateAvatar } }) {
      console.log("updateavatar", updateAvatar.urlAvatar);
      const { getUser } = cache.readQuery({
        query: GET_USER,
      });
      console.log("getUser", getUser.avatar);
      cache.writeQuery({
        query: GET_USER,
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];

    try {
      setLoading(true);
      // console.log("file", file);
      const result = await updateAvatar({
        variables: {
          file,
        },
      });

      const { data } = result;

      if (!data.updateAvatar.status) {
        toast("Hubo un error al subir la imagen!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Menu as="div" className="ml-3 relative">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img className="h-20 w-20 rounded-full" src={user?.avatar} alt="" />
        </Menu.Button>
        {loading && "Cargando"}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                {...getRootProps()}
                type="button"
                className={classNames(
                  active ? "bg-gray-100 cursor-pointer" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Cargar nueva imagen
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Eliminar imagen
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Cancelar
              </a>
            )}
          </Menu.Item>
          <input {...getInputProps()} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Avatar;
