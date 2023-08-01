import { ToastContainer } from "react-toastify";
import axios from "../../src/config/axiosConfig";
import { useEffect, useState } from "react";
import useAppData from "../../src/hooks/useAppData";
import "react-toastify/dist/ReactToastify.css";
import { MdAddAPhoto } from "react-icons/md";
import CurrencyInput from "react-currency-input-field";
import { useRouter } from "next/router";

const Produto = () => {
  const [url, setUrl] = useState(null);
  const [sending, setSending] = useState(false);
  const [product, setProduct] = useState({});
  const { data, handleData } = useAppData();
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});

  const [manualForm, setManualForm] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

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
  const sendProductAuto = (e) => {
    e.preventDefault();
    setSending(true);
    axios
      .post("/products", { url: url })
      .then((response) => {
        if (response.data.url) {
          data.notify("Produto enviado com sucesso");
          setTimeout(() => {
            router.push("/perfil/editar");
          }, 5000);
        } else {
          setSending(false);

          setManualForm(true);
        }
      })
      .catch((err) => {
        setSending(false);
        if (err.response.data.message) {
          data.notify_error(err.response.data.message);
          setManualForm(false);
        }
      });
  };
  const getCategories = () => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container w-full">
      <h1 className="text-2xl text-light-primary">Postar nova promo</h1>
      <form
        method="post"
        className={`w-full ${manualForm ? "hidden" : ""}`}
        onSubmit={sendProductAuto}
      >
        {/* Login component  */}
        <div className="flex flex-col p-4">
          <span>Link da promo</span>
          <input
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            placeholder="Link completo da promo"
            type="text"
            name="url"
            defaultValue={product.url}
          ></input>
          <span>Preço R$</span>
          <CurrencyInput
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            placeholder="Link completo da promo"
            prefix="R$"
            name="price"
            decimalsLimit="2"
            defaultValue={product.price}
            onValueChange={(value, name) => {
              setProduct({
                ...product,
                ...{
                  price: value,
                },
              });
            }}
          />
          <span>Nome</span>
          <input
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            placeholder="Link completo da promo"
            type="text"
            name="url"
            defaultValue={product.title}
          ></input>
          <span>Categoria</span>
          <select
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            value={categorySelected.id}
            defaultValue={categorySelected.id}
            onChange={(e) => {
              //Filter
              const cat_select = categories.filter((category) => {
                return category.id === e.target.value;
              });
              console.log(categorySelected);
              setCategorySelected(cat_select);
              setProduct({
                ...product,
                ...{
                  category: e.target.value,
                },
              });
              console.log(product);
            }}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <label htmlFor="avatar" className="cursor-pointer">
            Selecione uma imagem
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
            className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary w-1/6"
            disabled={sending}
          >
            <svg
              aria-hidden="true"
              role="status"
              className={`inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 ${
                sending ? "" : "hidden"
              }`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Enviar
          </button>
        </div>
      </form>
      <form
        method="post"
        className={`w-full ${manualForm ? "" : "hidden"}`}
        onSubmit={sendProductAuto}
      >
        {/* Login component  */}
        <div className="flex flex-col p-4">
          <span>Link da promo</span>
          <input
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            placeholder="Link completo da promo"
            type="text"
            name="url"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          ></input>
          <button
            type="submit"
            className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary w-1/6"
            disabled={sending}
          >
            <svg
              aria-hidden="true"
              role="status"
              className={`inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 ${
                sending ? "" : "hidden"
              }`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Enviar
          </button>
        </div>
      </form>
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

export default Produto;
