import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiBellAlert } from "react-icons/hi2";
import { BiDoorOpen } from "react-icons/bi";
import DarkButtton from "../darkmode/toogle";
import Link from "next/link";
import useAppData from "../../hooks/useAppData";
import { FaWindowClose } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { FaStore } from "react-icons/fa";
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
        className={`h-full overflow-x-hidden transition-all duration-300 bg-light-sidebar dark:bg-dark-sidebar text-white relative shadow-lg backdrop-blur-sm ${isOpen ? "w-64" : "w-0"}`}
      >
        <div className="flex justify-end p-3">
          <FaWindowClose
            className="text-white hover:text-light-primary transition-transform hover:scale-110 cursor-pointer"
            onClick={() => handleData({ sidebar_open: !data.sidebar_open })}
            size={24}
          />
        </div>

        <ul className="w-full space-y-1">
          <li
            onClick={() => {
              handleData({
                sidebar_open: !data.sidebar_open,
              });
            }}
            className={`px-4 py-3 transition-all duration-200 hover:bg-light-primary/20 cursor-pointer rounded-r-lg ${router.pathname === "/" ? "bg-light-primary/30 border-l-4 border-light-primary font-semibold" : ""}`}
          >
            <Link
              href={{
                pathname: "/",
              }}
              className="text-white flex items-center group"
              title="Início"
            >
              <AiOutlineHome className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Início</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleData({
                sidebar_open: !data.sidebar_open,
              });
            }}
            className={`px-4 py-3 transition-all duration-200 hover:bg-light-primary/20 cursor-pointer rounded-r-lg ${router.pathname === "/categoria/todos" ? "bg-light-primary/30 border-l-4 border-light-primary font-semibold" : ""}`}
          >
            <Link
              href={{
                pathname: "/categoria/todos",
              }}
              title="Categorias"
              className="text-white flex items-center group"
            >
              <TbCategory className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Categorias</span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleData({
                sidebar_open: !data.sidebar_open,
              });
            }}
            className={`px-4 py-3 transition-all duration-200 hover:bg-light-primary/20 cursor-pointer rounded-r-lg ${router.pathname === "/loja/todos" ? "bg-light-primary/30 border-l-4 border-light-primary font-semibold" : ""}`}
          >
            <Link
              href={{
                pathname: "/loja/todos",
              }}
              title="Lojas"
              className="text-white flex items-center group"
            >
              <FaStore className="mr-4 text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Lojas</span>
            </Link>
          </li>
          {data.user ? (
            <li
              onClick={() => {
                handleData({
                  sidebar_open: !data.sidebar_open,
                });
              }}
              className={`px-4 py-3 transition-all duration-200 hover:bg-light-primary/20 cursor-pointer rounded-r-lg ${router.pathname === "/perfil/editar" ? "bg-light-primary/30 border-l-4 border-light-primary font-semibold" : ""}`}
            >
              <Link
                href={{
                  pathname: "/perfil/editar",
                }}
                title="Perfil"
                className="text-white flex items-center group"
              >
                <CgProfile className="mr-4 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium">Perfil</span>
              </Link>
            </li>
          ) : null}
          {data.user ? (
            <li onClick={logout} className="px-4 py-3 transition-all duration-200 hover:bg-light-primary/20 cursor-pointer rounded-r-lg mt-4 border-t border-gray-700/30">
              <a href="#" className="text-white flex items-center group">
                <BiDoorOpen className="mr-4 text-xl group-hover:scale-110 transition-transform" />
                <span className="font-medium">Sair</span>
              </a>
            </li>
          ) : null}
        </ul>
        <div className={`w-full flex justify-center absolute bottom-8 ${isOpen ? "opacity-100" : "opacity-0"} transition-all duration-300 transform ${isOpen ? "translate-y-0" : "translate-y-4"}`}>
          <DarkButtton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
