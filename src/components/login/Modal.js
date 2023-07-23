import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Login from "./Login";
import Register from "./Register";
import Recovery from "./Recovery";

export default (props) => {
  const [modalMode, setModalMode] = useState("login");

  const closeModal = () => {
    return props.open();
  };

  const toogleLoginMode = (action) => {
    setModalMode(action);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-40 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full bg-gray-900 opacity-70"></div>
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-100% max-h-full flex justify-center items-center">
        <div className="relative w-full max-w-lg max-h-full opacity-100">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2 border-light-primary">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Entrar
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <AiFillCloseCircle size={28} onClick={props.open} />
              </button>
            </div>
            {/* Body modal */}
            {modalMode == "login" ? (
              <Login
                toogleLoginMode={toogleLoginMode}
                closeModal={closeModal}
              ></Login>
            ) : null}
            {modalMode == "register" ? (
              <Register toogleLoginMode={toogleLoginMode}></Register>
            ) : null}
            {modalMode == "recovery" ? (
              <Recovery toogleLoginMode={toogleLoginMode}></Recovery>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
