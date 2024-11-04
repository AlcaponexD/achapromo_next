import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppData from "../../src/hooks/useAppData";
import axios from "../../src/config/axiosConfig";
import { MdAddAPhoto } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "../../src/components/products/profile/list";

const Editar = ({ user }) => {
  const router = useRouter();
  const { data, handleData } = useAppData();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return false;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const getUser = () => {
    axios
      .get("/users/me")
      .then((response) => {
        console.log(response.data);
        setImagePreview(response.data.avatar);
        handleData({
          user: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
        router.push("/");
      });
  };

  const uploadSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    axios
      .patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        data.notify("Avatar atualizado com sucesso");
        setTimeout(() => {
          location.reload();
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function validate(body) {
    if (body.password || body.password_confirmation) {
      if (body.password !== body.password_confirmation) {
        data.notify_error(
          "Senha e/ou confirmação de senha precisam ser idênticos"
        );
        return false;
      }
    }
    return body;
  }

  const updateExec = (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //Valida dados antes de enviar

    const body_req = validate(formJson);

    if (body_req) {
      axios
        .put("/users", body_req)
        .then((resp) => {
          if (!resp) {
            data.notify("Ocorreu um erro ao atualizar perfil");
          }
          data.notify("Perfil atualizado com sucesso");
          handleData({
            user: resp.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container w-full">
      <h1 className="bg-gray-200 dark:bg-gray-950 p-2 text-2xl text-light-primary border border-dark-primary rounded-md">
        Editar perfil
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="p-4 md:w-1/4 flex justify-center md:justify-start">
          <form
            method="patch"
            encType="multipart/form-data"
            className="relative flex flex-col"
            onSubmit={uploadSubmit}
          >
            <label htmlFor="avatar" className="cursor-pointer">
              <MdAddAPhoto size={28}></MdAddAPhoto>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Avatar"
                  className="rounded-md w-[250px]"
                />
              )}
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              className="hidden"
              name="avatar"
              id="avatar"
            ></input>
            <button
              type="submit"
              className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary px-6"
            >
              Upload
            </button>
          </form>
        </div>
        <form method="post" className="md:w-3/4" onSubmit={updateExec}>
          {/* Login component  */}
          <div className="flex flex-col p-4">
            <span>Nome completo</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Seu nome completo"
              type="text"
              name="name"
              defaultValue={data.user ? data.user.name : ""}
            ></input>
            <span>Endereço de e-mail</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Seu email@provedor.com.br"
              type="email"
              name="email"
              defaultValue={data.user ? data.user.email : ""}
            ></input>
            <span>Sua senha</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Sua senha"
              name="password"
              type="password"
            ></input>
            <span>Repita sua senha</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Sua senha"
              name="password_confirmation"
              type="password"
            ></input>
            <button
              type="submit"
              className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary "
            >
              Editar
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <ProductList></ProductList> */}
    </div>
  );
};

export default Editar;
