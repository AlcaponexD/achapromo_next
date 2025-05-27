import { useRouter } from "next/router";
import axios from "../../../src/config/axiosConfig";
import Head from "next/head";
import CardProduct from "../../../src/components/tabs/CardProduct";
import Pagination from "../../../src/components/utils/pagination";
import OrderSelect from "../../../src/components/utils/OrderSelect";
import DiscountBadge from "../../../src/components/products/DiscountBadge";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { page = 1, per_page = 20, order_by = "discount", order_direction = "desc" } = context.query;
  try {
    const response = await axios.get(`/categories/${id}`, {
      params: {
        page,
        per_page,
        order_by,
        order_direction
      }
    });
    return {
      props: {
        products: response.data.products,
        category: response.data.category,
        totalPages: response.data.pagination.totalPages || 1,
        currentPage: response.data.pagination.page || parseInt(page)
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

const Product = ({ products, category, totalPages, currentPage }) => {
  const router = useRouter();
  // Pega o valor inicial da query ou usa o padrão
  const initialOrderBy = router.query.order_by || "discount";
  const initialOrderDirection = router.query.order_direction || "desc";
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [orderDirection, setOrderDirection] = useState(initialOrderDirection);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
    });
  };

  const handleOrderChange = ({ order_by, order_direction }) => {
    setOrderBy(order_by);
    setOrderDirection(order_direction);
    // Agora adiciona order_by/order_direction na URL para SSR
    router.push({
      pathname: router.pathname,
      query: { ...router.query, order_by, order_direction, page: 1 }
    });
  };

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
        <OrderSelect orderBy={orderBy} orderDirection={orderDirection} onChange={handleOrderChange} />
        <h1 className="text-2xl text-dark-primary font-bold ">
          Categoria: {category.title}
        </h1>
        {products.map((product, index) => (
          <div key={index} className="relative">
            <DiscountBadge percentage={product.discount} />
            <CardProduct product={product} />
          </div>
        ))}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Product;
