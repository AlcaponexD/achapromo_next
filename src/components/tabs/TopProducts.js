import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import axios from "../../config/axiosConfig";

export default (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/products/tops").then((response) => {
      setProducts(response.data);
      console.log(response);
    });
  }, []);
  return (
    <div className="container w-screen p-2">
      {products.map((product, index) => {
        return <CardProduct product={product} key={index}></CardProduct>;
      })}
    </div>
  );
};
