import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppData from "../../src/hooks/useAppData";
import axios from "../../src/config/axiosConfig";
import { MdAddAPhoto } from "react-icons/md";

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
    console.log(selectedFile);
    console.log(formData);
    axios
      .patch("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container w-full">
      <h1 className="text-2xl text-light-primary">Editar perfil</h1>
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
        <form method="post" className="md:w-3/4">
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
    </div>
  );
};

export default Editar;
