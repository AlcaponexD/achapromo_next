import React, { useState } from "react";
import CardProduct from "./CardProduct";
import Pagination from "../utils/pagination";

const FeaturedProducts = ({ initialProducts, initialTotal }) => {
  const [products, setProducts] = useState(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const per_page = 25;

  const getProducts = async (page = 1) => {
    const axios = (await import("../../config/axiosConfig")).default;
    const response = await axios.get("/products/recommends", {
      params: {
        page,
        per_page,
      },
    });
    setProducts(response.data.products);
    setTotalPages(response.data.total);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(page);
  };

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

export default FeaturedProducts;