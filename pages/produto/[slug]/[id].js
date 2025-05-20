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
      </Head>
      <div className="w-full container flex mt-4 max-[600px]:flex-wrap flex-col dark:bg-dark-sidebar bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center w-full max-[600px]:flex-wrap p-4">
          <div className="w-1/3 p-3 flex justify-center items-center">
            <img className="img_prod object-contain hover:scale-105 transition-transform duration-200" src={product.avatar} alt={product.title}></img>
          </div>
          <div className="w-2/3 p-3 space-y-3">
            <h1 className="text-sm md:text-2xl font-bold text-light-primary hover:text-light-secondary transition-colors">
              {product.title}
            </h1>
            <div className="flex items-center space-x-2">
              {/* <span className="text-light-primary text-sm hover:text-light-secondary transition-colors cursor-pointer">
                {product.user?.name}
              </span> */}
              <span className="text-[11px] md:text-sm text-gray-500">
                {translateDatePtBr(product.created_at)}
              </span>
            </div>
            <p
              title={product.description}
              className="text-justify text-base line-clamp-4 hover:line-clamp-none transition-all duration-300"
            >
              {product.description}
            </p>
          </div>
          <div className="flex flex-col p-3 text-center content-center space-y-4">
            <div className="flex flex-col p-2 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
              <span className="text-xl md:text-3xl font-bold text-light-primary">
                {formatarReal(product.price / 100)}
              </span>
            </div>
            <div className="w-[200px]">
              <a
                href={product.url}
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
                <span>{product.classification}</span>
                <AiFillStar className="text-light-primary"></AiFillStar>
              </button>
              <span className="flex items-center space-x-1">
                <span>{product.total_comments}</span>
                <AiOutlineComment className="text-light-primary"></AiOutlineComment>
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 border-t dark:border-dark-primary/20">
          <h2 className="text-xl font-semibold mb-4">Histórico de Preços</h2>
          <HistoryGrapics data={product.history} width={600} />
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
