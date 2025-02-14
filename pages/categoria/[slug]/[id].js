import { useRouter } from "next/router";
import axios from "../../../src/config/axiosConfig";
import Head from "next/head";
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
    <>
      <Head>
        <title>Compare o histórico de preços de produtos da categoria: {category.title}</title>
        <meta name="description" content={`Veja o histórico de preços dos produtos da categoria ${category.title} e encontre a melhor oferta.`} />
        <meta property="og:title" content={`Histórico de Preços de produtos da categoria ${category.title}`} />
      </Head>

      <div>
        <h1 className="text-2xl text-dark-primary font-bold ">
          Categoria: {category.title}
        </h1>
        {products.map((product, index) => {
          return <CardProduct product={product} key={index}></CardProduct>;
        })}
      </div>
    </>
  );
};

export default Product;
