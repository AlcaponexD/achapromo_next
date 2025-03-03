import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import axios, { setAuthorizationHeader } from "../../config/axiosConfig";
import useAppData from "../../hooks/useAppData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ toogleLoginMode, closeModal }) {
  const { data, handleData } = useAppData();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = (data) => {
    return data;
  };

  const loginExec = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const resp = await axios.post("/sessions", validate(formJson));

      if (!resp) return;

      handleData({
        user: resp.data.user,
      });
      localStorage.setItem("token", resp.data.token);
      setAuthorizationHeader();
      closeModal();
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        data.notify_error(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ icon, label, name, type, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-300
            border-gray-300 dark:border-gray-600 focus:border-light-primary focus:ring-light-primary
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Entrar na sua conta
      </h2>

      <form onSubmit={loginExec} className="space-y-6">
        <InputField
          icon={<FaEnvelope className="text-gray-400" />}
          label="Endereço de e-mail"
          name="email"
          type="email"
          placeholder="Seu email@provedor.com.br"
        />

        <div className="space-y-4">
          <InputField
            icon={<FaLock className="text-gray-400" />}
            label="Sua senha"
            name="password"
            type="password"
            placeholder="Sua senha"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => toogleLoginMode("recovery")}
              className="text-sm text-light-primary hover:text-light-secondary transition-colors duration-300"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
            bg-light-primary hover:bg-light-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary
            transition-all duration-300 transform hover:scale-[1.02]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            ${isLoading ? 'animate-pulse' : ''}`}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Não tem conta?{" "}
          <button
            onClick={() => toogleLoginMode("register")}
            className="font-medium text-light-primary hover:text-light-secondary transition-colors duration-300"
          >
            Registre-se
          </button>
        </p>
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
