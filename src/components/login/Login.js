import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import axios, { setAuthorizationHeader } from "../../config/axiosConfig";
import useAppData from "../../hooks/useAppData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ toogleLoginMode, closeModal }) {
  const { data, handleData } = useAppData();

  const validate = (data) => {
    return data;
  };

  const loginExec = (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //Valida dados antes de enviar

    const body_req = validate(formJson);
    axios
      .post("/sessions", body_req)
      .then((resp) => {
        if (!resp) {
          return;
        }
        handleData({
          user: resp.data.user,
        });
        localStorage.setItem("token", resp.data.token);
        setAuthorizationHeader();
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          data.notify_error(
            err.response.data.message
          );
        }
      });

    console.log(data);
  };

  return (
    <div>
      <form method="post" onSubmit={loginExec}>
        {/* Login component  */}
        <div className="flex flex-col p-4">
          <span>Endereço de e-mail</span>
          <input
            name="email"
            className="p-2 text-black border-light-primary border-2 rounded-md hover:border-light-secondary"
            placeholder="Seu email@provedor.com.br"
            type="text"
          ></input>
          <span>Sua senha</span>
          <input
            name="password"
            className="p-2 text-black border-light-primary border-2 rounded-md hover:border-light-secondary"
            placeholder="Sua senha"
            type="password"
          ></input>

          <div className="flex justify-between mt-2 cursor-pointer">
            <span>
              <input type="checkbox"></input> Lembrar
            </span>
            <a onClick={() => toogleLoginMode("recovery")}>
              Esqueceu sua senha ?
            </a>
          </div>

          <button
            type="submit"
            className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary"
          >
            Entrar
          </button>
        </div>
      </form>
      <div
        className={`flex items-start justify-between flex-col p-4 border-t rounded-t dark:border-gray-600`}
      >
        <h4 className="text-base mt-2">
          Não tem conta?{" "}
          <span
            onClick={() => toogleLoginMode("register")}
            className="cursor-pointer text-light-primary font-bold"
          >
            Registre-se
          </span>
        </h4>

        <h4 className="text-sm mt-2 hidden">Ou faça login como: </h4>
        <div className="flex gap-4 mt-2 hidden">
          <span className="flex justify-center items-center p-2 border rounded-md border-1 cursor-pointer hover:border-light-primary">
            <AiFillFacebook className="mr-2" /> Facebook
          </span>
          <span className="flex justify-center items-center p-2 border rounded-md border-1 cursor-pointer hover:border-light-primary">
            <AiFillGoogleCircle className="mr-2" /> Google
          </span>
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
}
