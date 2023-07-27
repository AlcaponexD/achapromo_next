import { useRouter } from "next/router";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";
import axios from "../../../src/config/axiosConfig";
import { useEffect, useState } from "react";

const Product = ({ query }) => {
  const [categories, setCategories] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/categories/${id}`).then((response) => {
        setCategories(response.data);
      });
    }
  }, id);
  return <div></div>;
};

export default Product;
