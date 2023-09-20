import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import CardProduct from "../../tabs/CardProduct";
const ProductList = () => {
  const [products, setProduct] = useState([]);
  const data_link = {
    pathname: "/produto/[slug]/[id]",
    query: { id: "product.id", slug: "product_slug " },
  };
  useEffect(() => {
    axios.get("products/show/me").then((response) => {
      setProduct(response.data);
    });
  }, []);
  return (
    <div>
      {products.map((product, index) => {
        return (
          <CardProduct
            product={product}
            dataLink={data_link}
            key={index}
          ></CardProduct>
        );
      })}
    </div>
  );
};

export default ProductList;
