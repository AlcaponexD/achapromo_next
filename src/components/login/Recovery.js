import { useState } from "react";
import axios from "../../config/axiosConfig";
import useAppData from "../../hooks/useAppData";
import { ToastContainer } from "react-toastify";
import { FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Recovery({ toogleLoginMode }) {
  const { data, handleData } = useAppData();
  const [code_recovery, setCodeRecovery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = (data) => {
    return data;
  };

  const recoveryExec = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const body_req = validate(formJson);

      await axios.post("/password/forgot", body_req);
      setCodeRecovery(true);
      data.notify("Código de recuperação enviado para seu e-mail!");
    } catch (err) {
      console.log(err);
      if (err.response?.status === 400) {
        data.notify_error(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const recoveryCodeExec = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const body_req = validate(formJson);

      const resp = await axios.post("/password/reset", body_req);

      if (resp.status === 200) {
        data.notify(resp.data.message);
        setTimeout(() => {
          toogleLoginMode("login");
        }, 3000);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        data.notify_error(err.response.data.message);
      }
    } finally {
      setLoading(false);
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
        {code_recovery ? "Redefinir senha" : "Recuperar senha"}
      </h2>

      {code_recovery ? (
        <form onSubmit={recoveryCodeExec} className="space-y-6">
          <InputField
            icon={<FaLock className="text-gray-400" />}
            label="Nova senha"
            name="password"
            type="password"
            placeholder="Digite sua nova senha"
          />

          <InputField
            icon={<FaLock className="text-gray-400" />}
            label="Confirme a nova senha"
            name="password_confirmation"
            type="password"
            placeholder="Confirme sua nova senha"
          />

          <InputField
            icon={<FaKey className="text-gray-400" />}
            label="Token de segurança"
            name="token"
            type="text"
            placeholder="Cole aqui o token recebido por e-mail"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
              bg-light-primary hover:bg-light-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary
              transition-all duration-300 transform hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${loading ? 'animate-pulse' : ''}`}
          >
            {loading ? "Alterando senha..." : "Alterar senha"}
          </button>
        </form>
      ) : (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
            Digite seu e-mail para receber as instruções de recuperação de senha
          </p>

          <form onSubmit={recoveryExec} className="space-y-6">
            <InputField
              icon={<FaEnvelope className="text-gray-400" />}
              label="Endereço de e-mail"
              name="email"
              type="email"
              placeholder="Seu email@provedor.com.br"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
                bg-light-primary hover:bg-light-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary
                transition-all duration-300 transform hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${loading ? 'animate-pulse' : ''}`}
            >
              {loading ? "Enviando..." : "Enviar instruções"}
            </button>
          </form>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lembrou sua senha?{" "}
          <button
            onClick={() => toogleLoginMode("login")}
            className="font-medium text-light-primary hover:text-light-secondary transition-colors duration-300"
          >
            Voltar ao login
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
