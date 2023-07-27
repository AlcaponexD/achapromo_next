import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
export default () => {
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
    <div className="flex flex-wrap justify-center  ">
      {categories.map((category, index) => {
        return (
          <span
            key={index}
            className="flex justify-center items-center w-[150px] h-[150px] mr-4 mt-2 p-2 border dark:border-dark-sidebar hover:bg-slate-300 hover:dark:text-light-primary dark:text-dark-text hover:text-dark-primary text-light-text  rounded-lg"
          >
            <span className="text-center">{category.title}</span>
          </span>
        );
      })}
    </div>
  );
};
