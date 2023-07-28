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

const Cabecalho = (props) => {
  //Sim é function
  const { data, handleData } = useAppData();

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

  useEffect(() => {
    getUser();
  }, []);
  return (
    <header className="w-full px-2">
      <Head>
        <title>Achapromo.com.br</title>
        <link rel="icon" href="https://nextjs.org/favicon.ico" sizes="any" />
      </Head>
      <div className="flex flex-wrap justify-between  items-center h-full border-b py-2 dark:border-b-gray-700 border-b-gray-300 w-full">
        <button
          onClick={() => {
            handleData({
              sidebar_open: !data.sidebar_open,
            });
          }}
        >
          <AiOutlineMenu size={24} />
        </button>
        <div>
          <span className=" cursor-pointer roboto-300 text-light-primary dark:text-dark-primary text-2xl">
            <Link
              href={{
                pathname: "/",
              }}
            >
              Achapromo
            </Link>
          </span>
        </div>
        <div>
          <input
            className="text-black xl:w-96 md:w-full p-2 rounded-md border"
            type="seach"
            placeholder="Busque aqui uma promoção"
          ></input>
        </div>
        <div
          className="gap-4 cursor-pointer text-light-primary dark:text-dark-primary flex justify-center 
        items-center"
        >
          <span>
            <BsPlusSquareFill size={28} />
          </span>
          <div className="relative hidden">
            <HiBellAlert
              size={36}
              className="border-b-light-highlight border-b-2"
            />
            <span className="absolute roboto-500 top-1 right-3.5 z-10 text-white rounded-full">
              3
            </span>
          </div>
          {!data.user ? (
            <span>
              <BiLogIn onClick={openLogin} size={38} />
            </span>
          ) : (
            <Link
              href={{
                pathname: "/perfil/editar",
              }}
            >
              <img
                src={
                  data.user.avatar
                    ? data.user.avatar
                    : "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                }
                className="w-8 rounded-full"
              ></img>
            </Link>
          )}
        </div>
      </div>
      <style jsx>{``}</style>
      {loginModal ? (
        <LoginModal open={openLogin} loginModal={loginModal}></LoginModal>
      ) : null}
    </header>
  );
};

export default Cabecalho;
