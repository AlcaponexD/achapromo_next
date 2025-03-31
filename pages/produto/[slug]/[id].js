import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";
import axios from "../../../src/config/axiosConfig";
import { useEffect, useState } from "react";
import { formatarReal, translateDatePtBr } from "../../../src/utils/helper";
import Comments from "../../../src/components/products/CommentsComponent";
import CommentsComponents from "../../../src/components/products/CommentsComponent";
import useAppData from "../../../src/hooks/useAppData";
import HistoryGrapics from "../../../src/components/products/HistoryGrapics";
import Head from 'next/head';
import DiscountBadge from "../../../src/components/products/DiscountBadge";

const Product = ({ query }) => {
  const { data, handleData } = useAppData();
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const changeStarsCountFromTrigger = (action) => {
    if (action === 'up') {
      setProduct((prevProduct) => {
        return { ...prevProduct, classification: prevProduct.classification + 1 };
      });
    } else {
      setProduct((prevProduct) => {
        return { ...prevProduct, classification: Math.max(0, prevProduct.classification - 1) };
      });
    }
  };


  const change_star = () => {
    if (!data.user) {
      return
    }
    axios.put(`/products/${product.id}/classification`).then((response) => {
      changeStarsCountFromTrigger(response.data)
    })
  }


  useEffect(() => {
    if (id) {
      axios.get(`/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);
  return (
    <>
      <Head>
        <title>{product.title} - Histórico de Preços</title>
        <meta name="description" content={`Veja o histórico de preços de ${product.title} e encontre a melhor oferta.`} />
        <meta property="og:title" content={`${product.title} - Histórico de Preços`} />
        <meta property="og:image" content={product.avatar} />
        image.png      </Head>
      <div className="w-full container mx-auto flex mt-4 flex-col dark:bg-dark-sidebar bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-wrap p-6 gap-6">
          <div className="w-full md:w-1/3 flex justify-center items-start">
            <div className="relative group w-full aspect-square bg-gray-50 dark:bg-dark-background rounded-lg overflow-hidden max-w-[300px] ">
              <DiscountBadge percentage={product.discount_percentage} />
              <img
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 ease-in-out mx-auto"
                src={product.avatar}
                alt={product.title}
              />
            </div>
          </div>
          <div className="w-full md:w-[calc(66.666667%-3rem)] space-y-4">
            <h1 className="text-xl md:text-2xl font-bold text-light-primary hover:text-light-secondary transition-colors">
              {product.title}
            </h1>
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-light-primary hover:text-light-secondary transition-colors cursor-pointer">
                {product.user?.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {translateDatePtBr(product.created_at)}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Preço atual</span>
                <span className="text-2xl md:text-4xl font-bold text-light-primary">
                  {formatarReal(product.price / 100)}
                </span>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm md:text-base bg-light-primary rounded-lg py-3 px-8 text-white hover:bg-light-secondary transition-all duration-200 transform hover:scale-105"
                >
                  Ver Promoção
                </a>
                <div className="flex justify-center gap-6 text-xl">
                  <button
                    className={`flex items-center gap-2 transition-all duration-200 hover:scale-110 ${!data.user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={change_star}
                    title={data.user ? 'Classificar produto' : 'Faça login para classificar'}
                  >
                    <span className="text-gray-700 dark:text-gray-300">{product.classification}</span>
                    <AiFillStar className="text-light-primary text-2xl" />
                  </button>
                  <span className="flex items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300">{product.total_comments}</span>
                    <AiOutlineComment className="text-light-primary text-2xl" />
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-light-primary/5 dark:bg-dark-primary/5 rounded-lg pl-3 p-2">
              {product.store && (
                <div className="flex items-center gap-2 text-sm text-light-primary">
                  <span className="font-medium">Loja:</span>
                  <span className="font-bold">{product.store.title}</span>
                </div>
              )}
              <p className="text-base text-gray-700 dark:text-gray-300 text-justify line-clamp-4 hover:line-clamp-none transition-all duration-300">
                {product.description}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t dark:border-dark-primary/20">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Histórico de Preços</h2>
          <div className="bg-white dark:bg-dark-background p-4 rounded-lg">
            <HistoryGrapics data={product.history} width={600} />
          </div>
        </div>
        <div className="border-t dark:border-dark-primary/20">
          <CommentsComponents comments={product.comments} product_id={product.id}></CommentsComponents>
        </div>
        <style jsx>{`
          .img_prod {
            max-height: 300px;
            width: auto;
            border-radius: 8px;
          }
        `}</style>
      </div>
    </>
  );
};

export default Product;
