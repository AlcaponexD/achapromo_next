import { useState } from "react";
import Categories from "../src/components/categories";
import FeaturedProducts from "../src/components/tabs/FeaturedProducts";
const Index = (props) => {
  const [active_tab, setActiveTab] = useState("recommended");

  function toogleActiveBar(tab) {
    setActiveTab(tab);
  }
  return (
    <div>
      <main className="">
        <Categories></Categories>
        <div className="flex justify-normal">
          <span
            className="bg-light-primary rounded p-1 m-2 px-4 cursor-pointer"
            onClick={() => toogleActiveBar("recommended")}
          >
            Recomendados
          </span>
          <span
            className="border-light-primary border rounded p-1 px-4 m-2 hover:bg-light-primary cursor-pointer"
            onClick={() => toogleActiveBar("news")}
          >
            Recentes
          </span>
          <span
            className="border-light-primary border rounded p-1 m-2 px-4 hover:bg-light-primary cursor-pointer"
            onClick={() => toogleActiveBar("top")}
          >
            Top stars
          </span>
        </div>
        {active_tab == "recommended" ? (
          <FeaturedProducts></FeaturedProducts>
        ) : null}
      </main>
    </div>
  );
};

export default Index;
