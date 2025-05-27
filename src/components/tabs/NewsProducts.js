import React, { useState } from "react";
import CardProduct from "./CardProduct";
import Pagination from "../utils/pagination";
import OrderSelect from "../utils/OrderSelect";

const NewsProducts = ({ initialProducts, initialTotal, initialOrderBy, initialOrderDirection }) => {
  const [products, setProducts] = useState(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState(initialOrderBy || "price");
  const [orderDirection, setOrderDirection] = useState(initialOrderDirection || "asc");
  const per_page = 25;

  const getProducts = async (page = 1, order_by = orderBy, order_direction = orderDirection) => {
    const axios = (await import("../../config/axiosConfig")).default;
    const response = await axios.get("/products/news", {
      params: {
        page,
        per_page,
        order_by,
        order_direction,
      },
    });
    setProducts(response.data.products);
    setTotalPages(response.data.total);
  };

  const handleOrderChange = ({ order_by, order_direction }) => {
    setOrderBy(order_by);
    setOrderDirection(order_direction);
    setCurrentPage(1);
    getProducts(1, order_by, order_direction);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(page, orderBy, orderDirection);
  };

  return (
    <div className="container w-screen p-2">
      <OrderSelect orderBy={orderBy} orderDirection={orderDirection} onChange={handleOrderChange} />
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

export default NewsProducts;