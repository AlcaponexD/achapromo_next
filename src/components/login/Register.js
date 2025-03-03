import { useState } from "react";
import axios from "../../config/axiosConfig";
import { ToastContainer } from "react-toastify";
import useAppData from "../../hooks/useAppData";
import Turnstile from "react-turnstile";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const SITE_KEY = "0x4AAAAAAA80od3YyJwQ3M53";

export default function Register({ toogleLoginMode }) {
  const [messageValidation, setMessageValidation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data, handleData } = useAppData();
  const [captchaToken, setCaptchaToken] = useState("");

  const validate_password = (data) => {
    if (!data) {
      return {
        error: true,
        message: "Data invalid",
      };
    }
    return data;
  };

  const registerExec = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!captchaToken) {
      data.notify_error("Complete o CAPTCHA antes de continuar.");
      setIsLoading(false);
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const body_req = validate_password(formJson);
    if (body_req.error) {
      console.log(body_req);
      setIsLoading(false);
      return;
    }

    delete body_req.password_confirmation;

    try {
      const resp = await axios.post("/users", body_req);
      if (!resp) return;

      if (resp.status === 200) {
        data.notify(resp.data.message);
        setTimeout(() => {
          toogleLoginMode("login");
        }, 3000);
      }
    } catch (err) {
      const response = err.response?.data;
      if (response?.validation) {
        const keys = response.validation.body.keys;
        const msg = {
          [keys[0]]: response.validation.body.message
        };
        setMessageValidation(msg);
      }

      if (err.response?.status === 400) {
        data.notify_error(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ icon, label, name, type, placeholder, error }) => (
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
            ${error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:border-light-primary focus:ring-light-primary"
            }
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          required
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Criar nova conta
      </h2>

      <form onSubmit={registerExec} className="space-y-6">
        <InputField
          icon={<FaUser className="text-gray-400" />}
          label="Nome completo"
          name="name"
          type="text"
          placeholder="Seu nome completo"
          error={messageValidation.name}
        />

        <InputField
          icon={<FaEnvelope className="text-gray-400" />}
          label="Endereço de e-mail"
          name="email"
          type="email"
          placeholder="Seu email@provedor.com.br"
          error={messageValidation.email}
        />

        <InputField
          icon={<FaLock className="text-gray-400" />}
          label="Sua senha"
          name="password"
          type="password"
          placeholder="Sua senha"
          error={messageValidation.password}
        />

        <InputField
          icon={<FaLock className="text-gray-400" />}
          label="Confirme sua senha"
          name="password_confirmation"
          type="password"
          placeholder="Confirme sua senha"
          error={messageValidation.password_confirmation}
        />

        <div className="flex justify-center">
          <Turnstile
            sitekey={SITE_KEY}
            onVerify={setCaptchaToken}
            className="transform scale-90"
          />
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
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Já tem conta?{" "}
          <button
            onClick={() => toogleLoginMode("login")}
            className="font-medium text-light-primary hover:text-light-secondary transition-colors duration-300"
          >
            Faça login
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
