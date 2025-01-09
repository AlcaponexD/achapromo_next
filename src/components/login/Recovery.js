import { useState } from "react";
import axios from "../../config/axiosConfig";
import useAppData from "../../hooks/useAppData";
import { ToastContainer } from "react-toastify";

export default function Recovery({ toogleLoginMode }) {
  const { data, handleData } = useAppData();
  const [code_recovery, setCodeRecovery] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (data) => {
    return data;
  };

  const recoveryExec = (e) => {
    setLoading(true);
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //Valida dados antes de enviar

    const body_req = validate(formJson);
    axios
      .post("/password/forgot", body_req)
      .then((resp) => {
        setCodeRecovery(true);
        console.log(code_recovery);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status == 400) {
          console.log(err.response.data.message)
          data.notify_error(
            err.response.data.message
          );
        }
        setLoading(false);
      });
  };

  const recoveryCodeExec = (e) => {
    setLoading(true);
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    //Valida dados antes de enviar

    const body_req = validate(formJson);
    axios
      .post("/password/reset", body_req)
      .then((resp) => {
        console.log(resp);
        if (resp.status == 200) {
          console.log(resp)
          data.notify(resp.data.message);
          setLoading(false);
          setTimeout(() => {
            toogleLoginMode("login");
          }, 3000);
        }
      })
      .catch((err) => {
        if (err.response.status == 400) {
          console.log(err.response.data.message)
          data.notify_error(
            err.response.data.message
          );
        }
        setLoading(false);
      });
  };

  return (
    <div>
      {code_recovery ? (
        <form method="post" onSubmit={recoveryCodeExec}>
          {/* Login component  */}
          <div className="flex flex-col p-4">
            <span>Resete sua senha aqui</span>

            <input
              className="text-black p-2 border-light-primary border-2 rounded-md hover:border-light-secondary "
              placeholder="Sua nova senha"
              type="password"
              name="password"
            ></input>
            <input
              className="text-black p-2 border-light-primary border-2 rounded-md hover:border-light-secondary "
              placeholder="Confirmação de senha"
              type="password"
              name="password_confirmation"
            ></input>
            <input
              className="text-black p-2 border-light-primary border-2 rounded-md hover:border-light-secondary "
              placeholder="Token de segurança"
              type="text"
              name="token"
            ></input>
            <button
              disabled={loading}
              className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary"
            >
              Mudar senha
            </button>
          </div>
        </form>
      ) : (
        <form method="post" onSubmit={recoveryExec}>
          {/* Login component  */}
          <div className="flex flex-col p-4">
            <span>Endereço de e-mail</span>
            <input
              className="text-black p-2 border-light-primary border-2 rounded-md hover:border-light-secondary "
              placeholder="Seu email@provedor.com.br"
              type="text"
              name="email"
            ></input>
            <button
              disabled={loading}
              className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary"
            >
              Recuperar senha
            </button>
          </div>
        </form>
      )}

      <div
        className={`flex items-start justify-between flex-col p-4 border-t rounded-t dark:border-gray-600`}
      >
        <h4 className="text-base mt-2">
          Já tem conta?{" "}
          <span
            onClick={() => {
              toogleLoginMode("login");
            }}
            className="cursor-pointer text-light-primary font-bold"
          >
            Faça o login
          </span>
        </h4>
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
