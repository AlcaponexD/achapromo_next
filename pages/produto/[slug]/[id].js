import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";
import axios from "../../../src/config/axiosConfig";
import { useEffect, useState } from "react";
// Importe a função
import { formatarReal, translateDatePtBr, truncateTitle } from "../../../src/utils/helper";
import Comments from "../../../src/components/products/CommentsComponent";
import CommentsComponents from "../../../src/components/products/CommentsComponent";
import useAppData from "../../../src/hooks/useAppData";
import HistoryGrapics from "../../../src/components/products/HistoryGrapics";
import SEO from '../../../src/components/seo';


const Product = ({ product }) => {
  const { data, handleData } = useAppData();
  const router = useRouter();
  const [productState, setProductState] = useState(product);

  const changeStarsCountFromTrigger = (action) => {
    if (action === 'up') {
      setProductState((prevProduct) => {
        return { ...prevProduct, classification: prevProduct.classification + 1 };
      });
    } else {
      setProductState((prevProduct) => {
        return { ...prevProduct, classification: Math.max(0, prevProduct.classification - 1) };
      });
    }
  };

  const change_star = () => {
    if (!data.user) {
      return
    }
    axios.put(`/products/${productState.id}/classification`).then((response) => {
      changeStarsCountFromTrigger(response.data)
    })
  }

  return (
    <>
      <SEO
        title={`${truncateTitle(productState.title, 35)} | AchaPromo`}
        description={`Histórico de preços ${truncateTitle(productState.title, 110)}. Compare ofertas e economize`}
        url={`https://achapromo.com.br/produto/${productState.slug || ''}/${productState.id}`}
        image={productState.avatar}
        updatedTime={productState.updated_at || productState.created_at}
        jsonLdData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productState.title,
          "image": productState.avatar,
          "description": productState.description,
          "sku": productState.id,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": (productState.price / 100).toFixed(2),
            "availability": "https://schema.org/InStock",
            "url": productState.url
          }
        }}
      />
      <div className="w-full container flex mt-4 max-[600px]:flex-wrap flex-col dark:bg-dark-sidebar bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center w-full max-[600px]:flex-wrap p-4">
          <div className="w-1/3 p-3 flex justify-center items-center">
            <img className="img_prod object-contain hover:scale-105 transition-transform duration-200" src={productState.avatar} title={productState.title} alt={productState.title}></img>
          </div>
          <div className="w-2/3 p-3 space-y-3">
            <h1 className="text-sm md:text-2xl font-bold text-light-primary hover:text-light-seconday transitiron-colors">
              {productState.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-xs md:text-base mb-2">
              Veja o histórico de preços da {productState.title}, acompanhe as variações, compare promoções e descubra o melhor momento para comprar este produto!
            </p>
            <div className="flex items-center space-x-2">

              <span className="text-light-primary text-sm hover:text-light-secondary transition-colors cursor-pointer">
                {productState.store?.title || 'Loja Desconhecida'}
              </span>
              <span className="text-[11px] md:text-sm text-gray-500">
                {translateDatePtBr(productState.created_at)}
              </span>
            </div>
            <p
              title={productState.description}
              className="text-justify text-base line-clamp-4 hover:line-clamp-none transition-all duration-300"
            >
              {productState.description}
            </p>
          </div>
          <div className="flex flex-col p-3 text-center content-center space-y-4">
            <div className="flex flex-col p-2 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
              <span className="text-xl md:text-3xl font-bold text-light-primary">
                {formatarReal(productState.price / 100)}
              </span>
            </div>
            <div className="w-[200px]">
              <a
                href={productState.url}
                title={`Verificar o produto ${productState.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base bg-light-primary rounded-lg p-3 px-8 text-white hover:bg-light-secondary transition-colors duration-200 inline-block w-full"
              >
                Pegar promo
              </a>
            </div>
            <div className="flex justify-center text-2xl space-x-4">
              <button
                className={`flex items-center space-x-1 transition-transform hover:scale-110 ${!data.user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={change_star}
                title={data.user ? 'Classificar produto' : 'Faça login para classificar'}
              >
                <span>{productState.classification}</span>
                <AiFillStar className="text-light-primary"></AiFillStar>
              </button>
              <span className="flex items-center space-x-1">
                <span>{productState.total_comments}</span>
                <AiOutlineComment className="text-light-primary"></AiOutlineComment>
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 border-t dark:border-dark-primary/20">
          <h2 className="text-xl font-semibold mb-4">Histórico de Preços</h2>
          <HistoryGrapics data={productState.history} width={600} />
        </div>
        <div className="border-t dark:border-dark-primary/20">
          <CommentsComponents comments={productState.comments} product_id={productState.id}></CommentsComponents>
        </div>
        <style jsx>{`
      .img_prod {
        max-height: 300px;
        width: auto;
        border-radius: 8px;
      }
    `}</style>
      </div >
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {

    const response = await axios.get(`/products/${id}`);
    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error);

    return {
      notFound: true, // Retorna página 404 se o produto não for encontrado
    };
  }
}

export default Product;
