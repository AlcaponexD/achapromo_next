import Link from "next/link";
import { useState } from "react";
import {
  AiFillCloseCircle,
  AiFillFacebook,
  AiFillGoogleCircle,
} from "react-icons/ai";

export default (props) => {
  const [modalMode, setModalMode] = useState("login");

  const toogleLoginMode = () => {
    let mode;
    modalMode == "login" ? (mode = "register") : (mode = "login");
    setModalMode(mode);
  };

  return (
    <div>
      <div class="fixed top-0 left-0 right-0 z-40 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-gray-900 opacity-70"></div>
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-100% max-h-full flex justify-center items-center"
      >
        <div class="relative w-full max-w-lg max-h-full opacity-100">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-2 border-light-primary">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Login
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <AiFillCloseCircle size={28} onClick={props.open} />
              </button>
            </div>
            {/* Body modal */}
            <div className={`${modalMode == "login" ? "block" : "hidden"}`}>
              <form>
                {/* Login component  */}
                <div className="flex flex-col p-4">
                  <span>Endereço de e-mail</span>
                  <input
                    className="p-2 border border-light-primary border-2 rounded-md hover:border-light-secondary"
                    placeholder="Seu email@provedor.com.br"
                    type="text"
                  ></input>
                  <span>Sua senha</span>
                  <input
                    className="p-2 border border-light-primary border-2 rounded-md hover:border-light-secondary"
                    placeholder="Sua senha"
                    type="password"
                  ></input>

                  <div className="flex justify-between mt-2">
                    <span>
                      <input type="checkbox"></input> Lembrar
                    </span>
                    <Link
                      href={{
                        pathname: "#",
                      }}
                    >
                      Esqueceu sua senha ?
                    </Link>
                  </div>

                  <button className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary">
                    Entrar
                  </button>
                </div>
              </form>
            </div>
            <div className={`${modalMode == "register" ? "block" : "hidden"}`}>
              <form>
                {/* Login component  */}
                <div className="flex flex-col p-4">
                  <span>Endereço de e-mail</span>
                  <input
                    className="p-2 border border-light-primary border-2 rounded-md hover:border-light-secondary"
                    placeholder="Seu email@provedor.com.br"
                    type="text"
                  ></input>
                  <span>Sua senha</span>
                  <input
                    className="p-2 border border-light-primary border-2 rounded-md hover:border-light-secondary"
                    placeholder="Sua senha"
                    type="password"
                  ></input>
                  <span>Repita sua senha</span>
                  <input
                    className="p-2 border border-light-primary border-2 rounded-md hover:border-light-secondary"
                    placeholder="Sua senha"
                    type="password"
                  ></input>
                  <button className="bg-light-primary rounded-md p-2 mt-4 hover:bg-light-secondary">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`flex items-start justify-between flex-col p-4 border-t rounded-t dark:border-gray-600 ${
                modalMode == "login" ? "block" : "hidden"
              }`}
            >
              <h4 className="text-base mt-2">
                Não tem conta?{" "}
                <span
                  onClick={toogleLoginMode}
                  className="cursor-pointer text-light-primary font-bold"
                >
                  Registre-se
                </span>
              </h4>

              <h4 className="text-sm mt-2">Ou faça login como: </h4>
              <div className="flex gap-4 mt-2 ">
                <span className="flex justify-center items-center p-2 border rounded-md border-1 cursor-pointer hover:border-light-primary">
                  <AiFillFacebook className="mr-2" /> Facebook
                </span>
                <span className="flex justify-center items-center p-2 border rounded-md border-1 cursor-pointer hover:border-light-primary">
                  <AiFillGoogleCircle className="mr-2" /> Google
                </span>
              </div>
            </div>
            <div
              className={`flex items-start justify-between flex-col p-4 border-t rounded-t dark:border-gray-600 ${
                modalMode == "register" ? "block" : "hidden"
              }`}
            >
              <h4 className="text-base mt-2">
                Já tem conta?{" "}
                <span
                  onClick={toogleLoginMode}
                  className="cursor-pointer text-light-primary font-bold"
                >
                  Faça o login
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
