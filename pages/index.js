import { useState } from "react";
import FeaturedProducts from "../src/components/tabs/FeaturedProducts";
import TopProducts from "../src/components/tabs/TopProducts";
import NewsProducts from "../src/components/tabs/NewsProducts";
import SEO from "../src/components/seo";

const Index = (props) => {
  const [active_tab, setActiveTab] = useState("top");

  function toogleActiveBar(tab) {
    setActiveTab(tab);
  }
  return (
    <>
      <SEO
        title="AchaPromo - Compare preços e veja histórico de hardware e periféricos"
        description="Encontre os melhores preços de hardware e periféricos de informática. Compare valores e veja o histórico de preços para comprar no momento certo!"
        image="/index-min.png"
        url="https://achapromo.com.br"
      />
      <div>
        <main className="">
          <div className="flex flex-col sm:flex-row justify-normal bg-white dark:bg-dark-sidebar p-2 rounded-lg shadow-sm mb-4">
            <span
              className={`${active_tab == 'top' ? 'bg-light-primary text-white' : 'text-gray-700 dark:text-gray-300'} rounded-md px-3 py-2 m-1 cursor-pointer transition-all duration-200 hover:bg-light-primary/10 flex-1 text-center font-medium text-sm sm:text-base`}
              onClick={() => toogleActiveBar("top")}
            >
              Melhores descontos
            </span>
            <span
              className={`${active_tab == 'recommended' ? 'bg-light-primary text-white' : 'text-gray-700 dark:text-gray-300'} rounded-md px-3 py-2 m-1 cursor-pointer transition-all duration-200 hover:bg-light-primary/10 flex-1 text-center font-medium text-sm sm:text-base`}
              onClick={() => toogleActiveBar("recommended")}
            >
              Recomendados
            </span>
            <span
              className={`${active_tab == 'news' ? 'bg-light-primary text-white' : 'text-gray-700 dark:text-gray-300'} rounded-md px-3 py-2 m-1 cursor-pointer transition-all duration-200 hover:bg-light-primary/10 flex-1 text-center font-medium text-sm sm:text-base`}
              onClick={() => toogleActiveBar("news")}
            >
              Recentes
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
    </>
  );
};

export default Index;
