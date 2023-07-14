import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiBellAlert } from "react-icons/hi2";
import { BiDoorOpen } from "react-icons/bi";
import DarkButtton from "../darkmode/toogle";
import Link from "next/link";
import useAppData from "../../hooks/useAppData";
import { FaWindowClose } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const { data, handleData } = useAppData();

  return (
    <div className="fixed h-screen z-20">
      <div
        className={`h-full overflow-x-hidden transition-all duration-300 bg-light-sidebar dark:bg-dark-sidebar  text-white relative ${
          isOpen ? "w-52" : "w-0"
        }`}
      >
        <FaWindowClose
          className="absolute right-0 my-2 z-10 cursor-pointer"
          onClick={() => handleData({ sidebar_open: !data.sidebar_open })}
          size={32}
        ></FaWindowClose>
        {/* Conteúdo do menu */}

        <ul className={`w-full py-2 `}>
          <li className="mb-2 px-2 py-1 bg-light-primary hover:opacity-80">
            <Link
              href={{
                pathname: "/",
              }}
              className="text-white flex items-center"
            >
              <AiOutlineHome className="mr-4" />
              Início
            </Link>
          </li>
          {data.user ? (
            <li className="mb-2 px-2 py-1">
              <a href="#" className="text-white flex items-center">
                <CgProfile className="mr-4" />
                Perfil
              </a>
            </li>
          ) : null}
          {data.user ? (
            <li className="mb-2 px-2 py-1">
              <a href="#" className="text-white flex items-center">
                <HiBellAlert className="mr-4" />
                Alertas
              </a>
            </li>
          ) : null}
          {data.user ? (
            <li className="mb-2 px-2 py-1">
              <a href="#" className="text-white flex items-center">
                <BiDoorOpen className="mr-4" />
                Sair
              </a>
            </li>
          ) : null}
        </ul>
        <div
          className={`w-full flex justify-center absolute bottom-10 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <DarkButtton />
        </div>
      </div>

      <style jsx>{``}</style>
    </div>
  );
};

export default Sidebar;
