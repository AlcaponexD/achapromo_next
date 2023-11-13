import { ToastContainer } from "react-toastify";
import axios from "../../../../src/config/axiosConfig";
import { useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import "react-toastify/dist/ReactToastify.css";
import { MdAddAPhoto } from "react-icons/md";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import { cleanNumber, formatarReal } from "../../../utils/helper";

const ProductUpdate = ({ id }) => {
  const [sending, setSending] = useState(false);
  const [product, setProduct] = useState({});
  const { data, handleData } = useAppData();
  const [categories, setCategories] = useState([]);

  const [manualForm, setManualForm] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const updateImage = (image) => {
    const formData = new FormData();
    formData.append("avatar", image);
    axios
      .patch(`/products/avatar/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        data.notify("Imagem atualizado com sucesso");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      updateImage(file);
    }
  };

  const validate = (data_form) => {
    console.log(data_form);
    if (
      !data_form.price ||
      !data_form.title ||
      !data_form.description ||
      !data_form.category_name
    ) {
      data.notify_error("Revise os campos, todos são obrigatórios");
      return false;
    }

    data_form.price = data_form.price.replace(/\D/g, "");

    return data_form;
  };

  const sendProductManual = (e) => {
    e.preventDefault();
    //setSending(true);

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //Valida dados antes de enviar

    console.log(formJson);
    const body_req = validate(formJson);
    if (body_req) {
      axios
        .put(`/products/${product.id}`, body_req)
        .then((resp) => {
          if (!resp) {
            data.notify_error("Ocorreu um erro ao atualizar a promo");
            setSending(false);
          }
          data.notify("Promo atualizada com sucesso !");
        })
        .catch((err) => {
          console.log(err);
          data.notify_error("Ocorreu um erro ao atualizar a promo");
          setSending(false);
        });
    }
  };

  const updatePrice = (event) => {
    const price = cleanNumber(event.target.value);
    // Cria uma cópia do objeto product
    const updatedProduct = { ...product };

    // Atualiza o atributo price
    updatedProduct.price = formatarReal(price);

    // Define a cópia atualizada como o novo estado
    setProduct(updatedProduct);
  };

  const updateCategory = (event) => {
    const categ = event.target.value;
    // Cria uma cópia do objeto product
    const updatedProduct = { ...product };
    updatedProduct.category = {
      title: categ,
    };

    console.log(updatedProduct);

    // Define a cópia atualizada como o novo estado
    setProduct(updatedProduct);
  };

  const setProductData = (product) => {
    setProduct(product);
    setImagePreview(product.avatar);
  };

  const send = () => {};

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        if (id) {
          axios.get(`/products/${id}`).then((response) => {
            setProductData(response.data);
          });
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, id);
  return (
    <div className="container w-full">
      <h1 className="bg-gray-200 dark:bg-gray-950 p-2 text-2xl text-light-primary border border-dark-primary rounded-md">
        Atualizar : {product.title}
      </h1>
      <div>
        {/* component  */}
        <div className="flex flex-col lg:flex-row p-4">
          <div className="flex justify-center p-4">
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
          </div>
          <form
            method="post"
            className="flex flex-col w-full"
            onSubmit={sendProductManual}
            encType="multipart/form-data"
          >
            <span>Nome</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Título completo da promo"
              type="text"
              name="title"
              defaultValue={product.title}
            ></input>
            <span>Descrição</span>
            <textarea
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Descrição da promo"
              name="description"
              defaultValue={product.description}
            ></textarea>
            <span>Link da promo</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              placeholder="Link completo da promo"
              type="text"
              name="url"
              defaultValue={product.url}
              disabled="disabled"
            ></input>
            <span>Preço R$</span>
            <input
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              value={formatarReal(product.price / 100)}
              onChange={updatePrice}
              name="price"
            ></input>
            <span>Categoria</span>
            <select
              className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
              name="category_name"
              value={product.category ? product.category.title : ""}
              onChange={updateCategory}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.title} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary w-full"
              disabled={sending}
              onClick={send}
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
          </form>
        </div>
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

export default ProductUpdate;
