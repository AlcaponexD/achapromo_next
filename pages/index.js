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
      component: (
        <TopProducts
          initialProducts={initialData.top.products}
          initialTotal={initialData.top.total}
          initialOrderBy="discount_percentage"
          initialOrderDirection="desc"
        />
      ),
    },
    {
      id: "recommended",
      label: "Recomendados",
      icon: <FaThumbsUp />,
      component: (
        <FeaturedProducts
          initialProducts={initialData.recommended.products}
          initialTotal={initialData.recommended.total}
          initialOrderBy="price"
          initialOrderDirection="asc"
        />
      ),
    },
    {
      id: "news",
      label: "Recentes",
      icon: <FaClock />,
      component: (
        <NewsProducts
          initialProducts={initialData.news.products}
          initialTotal={initialData.news.total}
          initialOrderBy="price"
          initialOrderDirection="asc"
        />
      ),
    }
  ];

  return (
    <>
      <SEO
        title="Histórico de Preços de Hardware e Periféricos | AchaPromo"
        description="Histórico de preços de hardware e periféricos: compare valores, acompanhe promoções e descubra o melhor momento para comprar."
        image="/index-min.png"
        url="https://achapromo.com.br"
        jsonLdData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Histórico de Preços de Hardware e Periféricos | AchaPromo",
          "description": "Histórico de preços de hardware e periféricos: compare valores, acompanhe promoções e descubra o melhor momento para comprar.",
          "url": "https://achapromo.com.br",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Histórico de Preços"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Melhores descontos"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Recomendados"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Recentes"
              }
            ]
          }
        }}
      />
      <div>
        <main className="mt-4">
          {/* Parágrafo SEO no topo */}
          <section className="mb-6 p-4 bg-white dark:bg-dark-sidebar rounded-xl shadow-sm  hidden md:block">
            <h1 className="text-2xl font-bold mb-2">Histórico de Preços de Hardware e Periféricos</h1>
            <p className="text-gray-700 dark:text-gray-300">
              Acompanhe o histórico de preços de hardware e periféricos, compare valores e descubra o melhor momento para comprar. Nosso site oferece gráficos de preço, tendências e promoções para você economizar sempre!
            </p>
          </section>
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
