import React, { useState } from 'react';
import CardProduct from './CardProduct';
import AdSenseCard from './AdSenseCard';
import Pagination from "../utils/pagination";
import PriceFilter from "../utils/PriceFilter";

const FeaturedProducts = ({ initialProducts, initialTotal }) => {
  const [products, setProducts] = useState(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilters, setPriceFilters] = useState({});
  const per_page = 25;

  const getProducts = async (page = 1, filters = priceFilters) => {
    const axios = (await import("../../config/axiosConfig")).default;
    const params = {
      page,
      per_page,
    };

    // Adiciona filtros de preço se existirem
    if (filters.from !== undefined) {
      params.from = filters.from;
    }
    if (filters.to !== undefined) {
      params.to = filters.to;
    }

    const response = await axios.get("/products/recommends", { params });
    setProducts(response.data.products);
    setTotalPages(response.data.total);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(page, priceFilters);
  };

  const handleFilterChange = (filters) => {
    setPriceFilters(filters);
    setCurrentPage(1);
    getProducts(1, filters);
  };

  return (
    <div className="container w-screen p-2">
      <PriceFilter onFilterChange={handleFilterChange} />
      {products.flatMap((product, index) => {
        const items = [<CardProduct product={product} key={product.id || `product-${index}`} />];
        if (index === 7) {
          items.push(<AdSenseCard key={`adsense-featured-${index}`} />);
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

export default FeaturedProducts;