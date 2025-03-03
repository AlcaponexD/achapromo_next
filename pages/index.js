import { useState } from "react";
import FeaturedProducts from "../src/components/tabs/FeaturedProducts";
import TopProducts from "../src/components/tabs/TopProducts";
import NewsProducts from "../src/components/tabs/NewsProducts";
import SEO from "../src/components/seo";
import { FaPercent, FaThumbsUp, FaClock } from "react-icons/fa";

const Index = (props) => {
  const [active_tab, setActiveTab] = useState("top");

  const tabs = [
    {
      id: "top",
      label: "Melhores descontos",
      icon: <FaPercent />,
      component: <TopProducts />
    },
    {
      id: "recommended",
      label: "Recomendados",
      icon: <FaThumbsUp />,
      component: <FeaturedProducts />
    },
    {
      id: "news",
      label: "Recentes",
      icon: <FaClock />,
      component: <NewsProducts />
    }
  ];

  return (
    <>
      <SEO
        title="AchaPromo - Compare preços e veja histórico de hardware e periféricos"
        description="Encontre os melhores preços de hardware e periféricos de informática. Compare valores e veja o histórico de preços para comprar no momento certo!"
        image="/index-min.png"
        url="https://achapromo.com.br"
      />
      <div>
        <main className="mt-4">
          {/* Tabs Navigation */}
          <div className="flex flex-col sm:flex-row justify-normal bg-white dark:bg-dark-sidebar p-2 rounded-xl shadow-sm mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center gap-2 rounded-lg px-4 py-3 m-1 cursor-pointer 
                  transition-all duration-300 font-medium text-sm sm:text-base flex-1
                  ${active_tab === tab.id
                    ? 'bg-light-primary text-white shadow-md transform scale-[1.02]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-light-primary/10'
                  }
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content with Animation */}
          <div className="transition-all duration-300">
            {tabs.find(tab => tab.id === active_tab)?.component}
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
