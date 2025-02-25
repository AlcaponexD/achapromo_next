import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import Link from "next/link";
import SEO from "./seo";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <SEO
        title="AchaPromo - Compare preços e veja histórico de hardware e periféricos"
        description="Encontre os melhores preços de hardware e periféricos de informática. Compare valores e veja o histórico de preços para comprar no momento certo!"
        image="/index-min.png"
        url="https://achapromo.com.br"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
        {categories.map((category, index) => {
          return (
            <Link
              key={category.id}
              href={{
                pathname: "/categoria/[slug]/[id]",
                query: { id: category.id, slug: category.slug },
              }}
            >
              <span
                className={`
                flex justify-center items-center w-full
                p-4 border-2 border-transparent dark:bg-dark-sidebar bg-white
                dark:border-dark-sidebar hover:border-light-primary dark:hover:border-dark-primary
                dark:text-dark-text hover:text-dark-primary text-light-text rounded-lg
                cursor-pointer shadow-sm hover:shadow-md transform hover:scale-105
                transition-all duration-300 ease-in-out h-28
                `}
              >
                <span className="text-center font-medium text-lg">{category.title}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Categories;
