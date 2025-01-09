import React, { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import axios from "../../config/axiosConfig";
import Pagination from "../utils/pagination";
export default (props) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const per_page = 2;

  const getProducts = (page = currentPage) => {
    axios
      .get("/products/recommends", {
        params: {
          page,
          per_page,
        },
      })
      .then((response) => {
        setProducts(response.data.products);
        setTotalPages(response.data.total);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(page);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container w-screen p-2">
      {products.map((product, index) => (
        <CardProduct product={product} key={index} />
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};