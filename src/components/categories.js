import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import Link from "next/link";
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
    <div className="flex flex-wrap justify-center h-fit">
      {categories.map((category, index) => {
        return (
          <Link
            href={{
              pathname: "/categoria/[slug]/[id]",
              query: { id: category.id, slug: category.slug },
            }}
          >
            <span
              key={category.id}
              className={`
            flex justify-center items-center w-[150px] h-[150px]
             mr-4 mt-2 p-2 border dark:bg-dark-sidebar bg-white
            dark:border-dark-sidebar hover:bg-slate-300 hover:dark:text-light-primary
            dark:text-dark-text hover:text-dark-primary text-light-text  rounded-lg
            cursor-pointer
            `}
            >
              <span className="text-center">{category.title}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
};
export default Categories;
