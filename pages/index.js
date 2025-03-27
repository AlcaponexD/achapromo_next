import { useState } from "react";
import FeaturedProducts from "../src/components/tabs/FeaturedProducts";
import TopProducts from "../src/components/tabs/TopProducts";
import NewsProducts from "../src/components/tabs/NewsProducts";
import SEO from "../src/components/seo";
import { FaPercent, FaThumbsUp, FaClock } from "react-icons/fa";
import axios from "../src/config/axiosConfig";
import CardProduct from "../src/components/tabs/CardProduct";
import Pagination from "../src/components/utils/pagination";

export async function getServerSideProps() {
  try {
    const [topProducts, recommendedProducts, newsProducts] = await Promise.all([
      axios.get("/products/tops", { params: { page: 1, per_page: 25 } }),
      axios.get("/products/recommends", { params: { page: 1, per_page: 25 } }),
      axios.get("/products/news", { params: { page: 1, per_page: 25 } })
    ]);

    return {
      props: {
        initialData: {
          top: {
            products: topProducts.data.products,
            total: topProducts.data.total
          },
          recommended: {
            products: recommendedProducts.data.products,
            total: recommendedProducts.data.total
          },
          news: {
            products: newsProducts.data.products,
            total: newsProducts.data.total
          }
        }
      }
    };
  } catch (error) {
    return {
      props: {
        initialData: {
          top: { products: [], total: 0 },
          recommended: { products: [], total: 0 },
          news: { products: [], total: 0 }
        }
      }
    };
  }
}

const Index = ({ initialData }) => {
  const [active_tab, setActiveTab] = useState("top");
  const [products, setProducts] = useState(initialData[active_tab].products);
  const [totalPages, setTotalPages] = useState(initialData[active_tab].total);
  const [currentPage, setCurrentPage] = useState(1);
  const per_page = 25;

  const fetchProducts = async (tabId, page = 1) => {
    const endpoints = {
      top: "/products/tops",
      recommended: "/products/recommends",
      news: "/products/news"
    };

    try {
      const response = await axios.get(endpoints[tabId], {
        params: { page, per_page }
      });
      setProducts(response.data.products);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setProducts(initialData[tabId].products);
    setTotalPages(initialData[tabId].total);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(active_tab, page);
  };

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
