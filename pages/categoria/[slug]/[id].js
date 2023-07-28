import { useRouter } from "next/router";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";
import axios from "../../../src/config/axiosConfig";
import { useEffect, useState } from "react";
import CardProduct from "../../../src/components/tabs/CardProduct";

const Product = ({ query }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/categories/${id}`).then((response) => {
        setProducts(response.data.products);
        setCategory(response.data.category);
      });
    }
  }, id);
  return (
    <div>
      <h1 className="text-2xl text-dark-primary font-bold ">
        Categoria: {category.title}
      </h1>
      {products.map((product, index) => {
        return <CardProduct product={product} key={index}></CardProduct>;
      })}
    </div>
  );
};

export default Product;
