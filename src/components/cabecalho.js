import Head from "next/head";
import useAppData from "../hooks/useAppData";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";
import { BiLogIn } from "react-icons/bi";
import LoginModal from "./login/Modal";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "../config/axiosConfig";
import { useRouter } from "next/router";
import { LiaSearchDollarSolid } from "react-icons/lia";
import { AiOutlineClose } from "react-icons/ai"; // Ícone de fechar

const Cabecalho = (props) => {
  //Sim é function
  const { data, handleData } = useAppData();
  const router = new useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const getUser = () => {
    axios
      .get("/users/me")
      .then((response) => {
        handleData({
          user: response.data,
        });
      })
      .catch((err) => {
        handleData({
          user: false,
        });
      });
  };

  const [loginModal, setLogin] = useState(false);

  function openLogin() {
    setLogin(!loginModal);
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      router.push(`/buscar/${e.target.value}`);
      setIsVisible(false);
    }
  }
  // Função para alternar o estado
  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <header className="w-full px-4 py-4 bg-white dark:bg-dark-background shadow-md">
      <div className="flex flex-wrap justify-between items-center h-full border-b py-4 dark:border-b-gray-700 border-b-gray-300 w-full mx-auto">
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          onClick={() => {
            handleData({
              sidebar_open: !data.sidebar_open,
            });
          }}
          aria-label="Toggle menu"
        >
          <AiOutlineMenu size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <div className="flex flex-col items-center md:items-start">
          <span className="cursor-pointer text-light-primary dark:text-dark-primary transition-colors duration-200 py-1">
            <Link
              className="font-extrabold text-3xl hover:text-light-secondary dark:hover:text-light-primary"
              href={{
                pathname: "/",
              }}
              title="Achapromo - Compare preços de hardware e periféricos"
            >
              Achapromo
            </Link>
          </span>
          <span className="hidden md:block font-light text-sm text-gray-600 dark:text-gray-400">
            Compare preços e veja histórico de hardware e periféricos
          </span>
          <span className="block md:hidden font-light text-xs text-gray-600 dark:text-gray-400">
            Compare preços de hardware e periféricos
          </span>
        </div>
        <div className="block sm:hidden">
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            onClick={toggleDiv}
            aria-label="Toggle search"
          >
            <LiaSearchDollarSolid size={28} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        <div className="hidden md:block relative flex-1 max-w-xl mx-4">
          <input
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-light-primary focus:border-transparent transition-all duration-200"
            type="search"
            placeholder="Busque aqui uma promoção"
            onKeyPress={handleSearch}
          />
        </div>
        <div className="gap-4 cursor-pointer text-light-primary dark:text-dark-primary flex justify-center items-center">
          {!data.user ? (
            <button
              onClick={openLogin}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              aria-label="Login"
            >
              <BiLogIn size={28} />
              <span className="hidden md:block text-sm font-medium">Entrar</span>
            </button>
          ) : (
            <Link
              href={{
                pathname: "/perfil/editar",
              }}
              className="relative group"
            >
              <img
                src={
                  data.user.avatar
                    ? data.user.avatar
                    : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                }
                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-light-primary transition-all duration-200 object-cover"
                alt="User avatar"
              />
            </Link>
          )}
        </div>
      </div>
      {
        isVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="relative p-4">
              <div className="relative">
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 pr-10"
                  type="search"
                  placeholder="Busque aqui uma promoção"
                  onKeyPress={handleSearch}
                  autoFocus
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  onClick={toggleDiv}
                  aria-label="Close search"
                >
                  <AiOutlineClose size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        )
      }
      {loginModal && <LoginModal open={openLogin} loginModal={loginModal} />}
    </header >
  );
};

export default Cabecalho;
