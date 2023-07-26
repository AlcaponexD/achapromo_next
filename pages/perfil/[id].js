import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppData from "../../src/hooks/useAppData";
import axios from "../../src/config/axiosConfig";

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const { data, handleData } = useAppData();
  const [profile, setProfile] = useState({});

  const getUser = (id) => {
    axios
      .get(`/users/show/${id}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, id);
  return (
    <div className="container">
      <form method="post">
        {/* Login component  */}
        <div className="flex flex-col p-4">
          <span>Nome completo</span>
          <input
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            placeholder="Seu nome completo"
            type="text"
            name="name"
          ></input>
          <span>Endereço de e-mail</span>
          <input
            className={`p-2 ${"border-light-primary border-2 rounded-md hover:border-light-secondary"}   text-light-text`}
            placeholder="Seu email@provedor.com.br"
            type="email"
            name="email"
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
            Registrar
          </button>
        </div>
      </form>
      <div
        className={`flex items-start justify-between flex-col p-4 border-t rounded-t dark:border-gray-600`}
      >
        <h4 className="text-base mt-2">
          Já tem conta?{" "}
          <span className="cursor-pointer text-light-primary font-bold">
            Faça o login
          </span>
        </h4>
      </div>
    </div>
  );
}
