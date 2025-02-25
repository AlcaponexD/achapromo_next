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
    <div className="container max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-light-primary mb-8 p-4 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900 rounded-lg shadow-sm">
        Editar perfil
      </h1>
      <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <div className="md:w-1/3 flex flex-col items-center space-y-4">
          <form
            method="patch"
            encType="multipart/form-data"
            className="w-full max-w-sm flex flex-col items-center space-y-4"
            onSubmit={uploadSubmit}
          >
            <div className="relative group cursor-pointer w-48 h-48 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-light-primary hover:border-light-secondary transition-colors duration-300">
              <label htmlFor="avatar" className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                <MdAddAPhoto size={40} className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" />
                <span className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">Alterar foto</span>
              </label>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Sem foto</span>
              )}
            </div>
            <input
              onChange={handleImageChange}
              type="file"
              className="hidden"
              name="avatar"
              id="avatar"
              accept="image/*"
            />
            <button
              type="submit"
              className="w-full bg-light-primary text-white rounded-lg py-3 px-6 font-medium hover:bg-light-secondary transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!selectedFile}
            >
              Atualizar foto
            </button>
          </form>
        </div>
        <form method="post" className="md:w-2/3" onSubmit={updateExec}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
              <input
                className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Seu nome completo"
                type="text"
                name="name"
                defaultValue={data.user ? data.user.name : ""}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço de e-mail</label>
              <input
                className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Seu email@provedor.com.br"
                type="email"
                name="email"
                defaultValue={data.user ? data.user.email : ""}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nova senha</label>
              <input
                className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Digite para alterar sua senha"
                name="password"
                type="password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar nova senha</label>
              <input
                className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Confirme sua nova senha"
                name="password_confirmation"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-light-primary text-white rounded-lg py-3 px-6 font-medium hover:bg-light-secondary transform hover:scale-105 transition-all duration-300"
            >
              Salvar alterações
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
    </div>
  );
};

export default Editar;
