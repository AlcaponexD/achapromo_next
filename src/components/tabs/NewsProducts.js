import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";
import Pagination from "../utils/pagination";
import OrderSelect from "../utils/OrderSelect";
import PriceFilter from "../utils/PriceFilter";
import AdSenseCard from "./AdSenseCard";

const NewsProducts = ({ initialProducts, initialTotal, initialOrderBy, initialOrderDirection }) => {
  const [products, setProducts] = useState(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState(initialOrderBy || "price");
  const [orderDirection, setOrderDirection] = useState(initialOrderDirection || "asc");
  const [priceFilters, setPriceFilters] = useState({});
  const per_page = 25;

  // useEffect para carregar o script do AdSense foi removido daqui

  const getProducts = async (page = 1, order_by = orderBy, order_direction = orderDirection, filters = priceFilters) => {
    const axios = (await import("../../config/axiosConfig")).default;
    const params = {
      page,
      per_page,
      order_by,
      order_direction,
    };

    // Adiciona filtros de preço se existirem
    if (filters.from !== undefined) {
      params.from = filters.from;
    }
    if (filters.to !== undefined) {
      params.to = filters.to;
    }

    const response = await axios.get("/products/news", { params });
    setProducts(response.data.products);
    setTotalPages(response.data.total);
  };

  const handleOrderChange = ({ order_by, order_direction }) => {
    setOrderBy(order_by);
    setOrderDirection(order_direction);
    setCurrentPage(1);
    getProducts(1, order_by, order_direction, priceFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(page, orderBy, orderDirection, priceFilters);
  };

  const handleFilterChange = (filters) => {
    setPriceFilters(filters);
    setCurrentPage(1);
    getProducts(1, orderBy, orderDirection, filters);
  };

  return (
    <div className="container w-screen p-2">
      <PriceFilter onFilterChange={handleFilterChange} />
      <OrderSelect orderBy={orderBy} orderDirection={orderDirection} onChange={handleOrderChange} />
      {products.flatMap((product, index) => {
        const items = [<CardProduct product={product} key={product.id || `product-${index}`} />];
        if (index === 7) {
          items.push(<AdSenseCard key={`adsense-news-${index}`} />);
        }
        return items;
      })}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NewsProducts;