import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiBellAlert } from "react-icons/hi2";
import { BiDoorOpen } from "react-icons/bi";
import DarkButtton from "../darkmode/toogle";
import Link from "next/link";
import useAppData from "../../hooks/useAppData";
import { FaWindowClose } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { useRouter } from "next/router";

const Sidebar = ({ isOpen }) => {
  const { data, handleData } = useAppData();
  const router = new useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    handleData({
      user: null,
    });
    router.push("/");
  };

  return (
    <div className="fixed h-screen z-20">
      <div
        className={`h-full overflow-x-hidden transition-all duration-300 bg-light-sidebar dark:bg-dark-sidebar  text-white relative ${isOpen ? "w-52" : "w-0"
          }`}
      >
        <FaWindowClose
          className="absolute right-1 my-2 z-10 cursor-pointer"
          onClick={() => handleData({ sidebar_open: !data.sidebar_open })}
          size={32}
        ></FaWindowClose>
        {/* Conteúdo do menu */}

        <ul className={`w-full py-2 `}>
          <li
            onClick={() => {
              handleData({
                sidebar_open: !data.sidebar_open,
              });
            }}
            className={`mb-2 px-2 py-1 hover:opacity-80 ${router.pathname === "/" ? "bg-light-primary" : ""
              }`}
          >
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
          <li
            onClick={() => {
              handleData({
                sidebar_open: !data.sidebar_open,
              });
            }}
            className={`mb-2 px-2 py-1 hover:opacity-80 ${router.pathname === "/categoria/todos" ? "bg-light-primary" : ""
              }`}
          >
            <Link
              href={{
                pathname: "/categoria/todos",
              }}
              className="text-white flex items-center"
            >
              <TbCategory className="mr-4" />
              Categorias
            </Link>
          </li>
          {data.user ? (
            <li
              onClick={() => {
                handleData({
                  sidebar_open: !data.sidebar_open,
                });
              }}
              className={`mb-2 px-2 py-1 hover:opacity-80 ${router.pathname === "/perfil/editar" ? "bg-light-primary" : ""
                }`}
            >
              <Link
                href={{
                  pathname: "/perfil/editar",
                }}
                className="text-white flex items-center"
              >
                <CgProfile className="mr-4" />
                Perfil
              </Link>
            </li>
          ) : null}
          {data.user ? (
            <li
              className={`mb-2 px-2 py-1 hover:opacity-80 hidden ${router.pathname === "/" ? "bg-light-primary" : ""
                }`}
            >
              <a href="#" className="text-white flex items-center">
                <HiBellAlert className="mr-4" />
                Alertas
              </a>
            </li>
          ) : null}
          {data.user ? (
            <li onClick={logout} className={`mb-2 px-2 py-1 hover:opacity-80`}>
              <a href="#" className="text-white flex items-center">
                <BiDoorOpen className="mr-4" />
                Sair
              </a>
            </li>
          ) : null}
        </ul>
        <div
          className={`w-full flex justify-center absolute bottom-20 ${isOpen ? "block" : "hidden"
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
