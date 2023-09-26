import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import CardProduct from "../../tabs/CardProduct";
import { string_to_slug } from "../../../utils/helper";

const ProductList = () => {
  const [products, setProduct] = useState([]);
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
            dataLink={{
              pathname: "/perfil/produto/[slug]/[id]",
              query: { id: product.id, slug: string_to_slug(product.title) },
            }}
            key={index}
          ></CardProduct>
        );
      })}
    </div>
  );
};

export default ProductList;
