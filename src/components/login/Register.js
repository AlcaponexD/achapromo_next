import { useState } from "react";
import axios from "../../config/axiosConfig";

export default function Register({ toogleLoginMode }) {
  const [messageValidation, setMessageValidation] = useState({});

  const validate_password = (data) => {
    if (!data) {
      return {
        error: true,
        message: "Data invalid",
      };
    }
    return data;
  };

  const registerExec = (e) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    //Valida dados antes de enviar
    const body_req = validate_password(formJson);
    if (body_req.error) {
      console.log(body_req);
      return;
    }

    //Delete confirmation
    delete body_req.password_confirmation;

    axios
      .post("/users", body_req)
      .then((resp) => {
        if (!resp) {
          return;
        }
        console.log(resp);
        toogleLoginMode("login");
      })
      .catch((err) => {
        const response = err.response.data;
        const keys = response.validation.body.keys;
        var msg = {};
        msg[keys[0]] = response.validation.body.message;
        setMessageValidation(msg);
        console.log(err);
      });
  };
  return (
    <div>
      <form method="post" onSubmit={registerExec}>
        {/* Login component  */}
        <div className="flex flex-col p-4">
          <span>Nome completo</span>
          <input
            className={`p-2 ${
              messageValidation.name
                ? "border-red-500 border-2 rounded-md hover:border-red-900"
                : "border-light-primary border-2 rounded-md hover:border-light-secondary"
            }   text-light-text`}
            placeholder="Seu nome completo"
            type="text"
            name="name"
          ></input>
          <span>Endereço de e-mail</span>
          <input
            className={`p-2 ${
              messageValidation.email
                ? "border-red-500 border-2 rounded-md hover:border-red-900"
                : "border-light-primary border-2 rounded-md hover:border-light-secondary"
            }   text-light-text`}
            placeholder="Seu email@provedor.com.br"
            type="email"
            name="email"
          ></input>
          <span>Sua senha</span>
          <input
            className={`p-2 ${
              messageValidation.password
                ? "border-red-500 border-2 rounded-md hover:border-red-900"
                : "border-light-primary border-2 rounded-md hover:border-light-secondary"
            }   text-light-text`}
            placeholder="Sua senha"
            name="password"
            type="password"
          ></input>
          <span>Repita sua senha</span>
          <input
            className={`p-2 ${
              messageValidation.password_confirmation
                ? "border-red-500 border-2 rounded-md hover:border-red-900"
                : "border-light-primary border-2 rounded-md hover:border-light-secondary"
            }   text-light-text`}
            placeholder="Sua senha"
            name="password_confirmation"
            type="password"
          ></input>
          <button
            type="submit"
            className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary "
          >
            Registrar
          </button>
        </div>
      </form>
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
    </div>
  );
}
