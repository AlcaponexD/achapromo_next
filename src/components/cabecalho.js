import Head from "next/head";
import useSideBarData from "../hooks/useSideBarData";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";
import { BiLogIn } from "react-icons/bi";
import LoginModal from "./LoginModal";
import { useState } from "react";

const Cabecalho = (props) => {
  //Sim é function
  const { open, toogleSideBar } = useSideBarData();

  const [loginModal, setLogin] = useState(false);

  function openLogin() {
    setLogin(!loginModal);
  }

  return (
    <header>
      <Head>
        <title>The page title aa</title>
      </Head>
      <div className="flex flex-wrap justify-between  items-center h-full border-b py-2 dark:border-b-gray-700 border-b-gray-300">
        <button onClick={toogleSideBar}>
          <AiOutlineMenu size={24} />
        </button>
        <div>
          <span className=" cursor-pointer roboto-300 text-light-primary dark:text-dark-primary text-2xl">
            Achapromo
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
          <div className="relative">
            <HiBellAlert
              size={36}
              className="border-b-light-highlight border-b-2"
            />
            <span className="absolute roboto-500 top-1 right-3.5 z-10 text-white rounded-full">
              3
            </span>
          </div>
          <span>
            <BiLogIn onClick={openLogin} size={38} />
          </span>
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
