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
        <title>{`Compare o histórico de preços de produtos da categoria: ${category.title} | AchaPromo`}</title>
        <meta name="description" content={`Veja o histórico de preços dos produtos da categoria ${category.title} e encontre a melhor oferta. Compare preços e economize na sua compra!`} />
        <meta property="og:title" content={`Histórico de Preços de produtos da categoria ${category.title} | AchaPromo`} />
        <meta property="og:description" content={`Veja o histórico de preços dos produtos da categoria ${category.title} e encontre a melhor oferta. Compare preços e economize na sua compra!`} />
        <meta property="og:url" content={`https://achapromo.com.br/categoria/${router.query.slug}/${category.id}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Histórico de Preços de produtos da categoria ${category.title} | AchaPromo`} />
        <meta name="twitter:description" content={`Veja o histórico de preços dos produtos da categoria ${category.title} e encontre a melhor oferta.`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": `Produtos da categoria ${category.title}`,
              "description": `Veja o histórico de preços dos produtos da categoria ${category.title} e encontre a melhor oferta.`,
              "url": `https://achapromo.com.br/categoria/${router.query.slug}/${category.id}`,
              "numberOfItems": products.length
            })
          }}
        />
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
