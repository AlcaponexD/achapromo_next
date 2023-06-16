import { useContext } from "react";
import SidebarContext from "../contexts/SidebarContext";

const useSideBarData = () => useContext(SidebarContext);

export default useSideBarData;
