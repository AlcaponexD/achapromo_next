import { useEffect, useState } from "react";
import axios from "../../src/config/axiosConfig";
import CardProduct from "../../src/components/tabs/CardProduct";
import { string_to_slug } from "../../src/utils/helper";

const ProductReview = () => {
  const [products, setProduct] = useState([]);

  const setApproved = (product, action, index) => {
    if (action == 'approved') {
      confirm("Deseja realmente aprovar?")
    } else {
      confirm("Deseja realmente reprovar?")
    }

    axios.post('products/in_review/moderate', {
      action,
      id: product.id
    }).then((response) => {
      console.log(response.data)
      const newProducts = products.slice(); // new array copy
      newProducts.splice(index, 1);
      setProduct(newProducts);

    }).catch((error) => {
      alert("error")
      console.log(error)
    });
  }

  useEffect(() => {
    axios.get("products/in_review").then((response) => {
      setProduct(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <CardProduct
              product={product}
              dataLink={{
                pathname: "/perfil/produto/[slug]/[id]",
                query: { id: product.id, slug: string_to_slug(product.title) },
              }}
              key={index}
            ></CardProduct>
            <div className="flex justify-end">
              <button className="px-4 p-1 bg-green-600 m-2 rounded hover:bg-green-500" onClick={() => {
                setApproved(product, 'approved', index)
              }}>Aprovar</button>
              <button className="px-4 p-1 bg-red-600 m-2 rounded hover:bg-red-500" onClick={() => {
                setApproved(product, 'reproved', index)
              }}>Excluir</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductReview;
