import { useRouter } from "next/router";
import axios from "../../../src/config/axiosConfig";
import Head from "next/head";
import CardProduct from "../../../src/components/tabs/CardProduct";

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const response = await axios.get(`/categories/${id}`);
    return {
      props: {
        products: response.data.products,
        category: response.data.category
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

const Product = ({ products, category }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Head>
        <title>{`Compare o histórico de preços de produtos da categoria: ${category.title}`}</title>
        <meta name="description" content={`Veja o histórico de preços dos produtos da categoria ${category.title} e encontre a melhor oferta.`} />
        <meta property="og:title" content={`Histórico de Preços de produtos da categoria ${category.title}`} />
      </Head>

      <div>
        <h1 className="text-2xl text-dark-primary font-bold ">
          Categoria: {category.title}
        </h1>
        {products.map((product, index) => {
          return <CardProduct product={product} key={index} />;
        })}
      </div>
    </>
  );
};

export default Product;
