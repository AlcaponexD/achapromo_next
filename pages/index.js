import { useState } from "react";
import Categories from "../src/components/categories";
import FeaturedProducts from "../src/components/tabs/FeaturedProducts";
import TopProducts from "../src/components/tabs/TopProducts";
import NewsProducts from "../src/components/tabs/NewsProducts";

const Index = (props) => {
  const [active_tab, setActiveTab] = useState("recommended");

  function toogleActiveBar(tab) {
    setActiveTab(tab);
  }
  return (
    <div>
      <main className="">
        <div className="flex justify-normal">
          <span
            className={active_tab == 'recommended' ? 'bg-light-primary rounded p-1 m-2 lg:px-4 cursor-pointer' : 'border-light-primary border rounded p-1 lg:px-4 m-2 hover:bg-light-primary cursor-pointer'}
            onClick={() => toogleActiveBar("recommended")}
          >
            Recomendados
          </span>
          <span
            className={active_tab == 'news' ? 'bg-light-primary rounded p-1 m-2 lg:px-4 cursor-pointer' : 'border-light-primary border rounded p-1 lg:px-4 m-2 hover:bg-light-primary cursor-pointer'}
            onClick={() => toogleActiveBar("news")}
          >
            Recentes
          </span>
          <span
            className={active_tab == 'top' ? 'bg-light-primary rounded p-1 m-2 lg:px-4 cursor-pointer' : 'border-light-primary border rounded p-1 lg:px-4 m-2 hover:bg-light-primary cursor-pointer'}
            onClick={() => toogleActiveBar("top")}
          >
            Top stars
          </span>
        </div>
        {active_tab == "recommended" ? (
          <FeaturedProducts></FeaturedProducts>
        ) : null}
        {active_tab == "top" ? (
          <TopProducts></TopProducts>
        ) : null}
        {active_tab == "news" ? (
          <NewsProducts></NewsProducts>
        ) : null}
      </main>
    </div>
  );
};

export default Index;
