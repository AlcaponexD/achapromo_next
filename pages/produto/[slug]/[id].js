import { useRouter } from "next/router";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";
import axios from "../../../src/config/axiosConfig";
import { useEffect, useState } from "react";
import { formatarReal, translateDatePtBr } from "../../../src/utils/helper";
import Comments from "../../../src/components/products/CommentsComponent";
import CommentsComponents from "../../../src/components/products/CommentsComponent";

const Product = ({ query }) => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/products/${id}`).then((response) => {
        setProduct(response.data);
      });
    }
  }, [id]);
  return (
    <div className="w-full flex mt-4 max-[600px]:flex-wrap flex-col dark:bg-dark-sidebar bg-white rounded-2xl">
      <div className="flex justify-center w-full  max-[600px]:flex-wrap">
        <div className="w-1/3 p-3 flex justify-center">
          <img className="img_prod" src={product.avatar}></img>
        </div>
        <div className="w-2/3 p-3">
          <h1 className="text-2xl font-bold	text-light-primary">
            {product.title}
          </h1>
          <p>
            <span className="text-light-primary  text-sm cursor-pointer">
              {product.user?.name}
            </span>
          </p>
          <span className="text-sm">
            {translateDatePtBr(product.created_at)}
          </span>
          <p
            title={product.description}
            className="text-justify text-base line-clamp-4"
          >
            {product.description}
          </p>
        </div>
        <div className="flex flex-col p-3 text-center content-center">
          <div className="flex flex-col p-2">
            <span className="text-3xl font-bold text-light-primary">
              {formatarReal(product.price / 100)}
            </span>
          </div>
          <div className="w-[200px] mb-2">
            <a
              href={product.url}
              className="bg-light-primary rounded-md p-2 px-8 text-white hover:bg-light-secondary"
            >
              Pegar promo
            </a>
          </div>
          <div className="flex justify-center text-2xl">
            <span className="flex items-center">
              {product.classification}{" "}
              <AiFillStar className="text-light-primary"></AiFillStar>
            </span>
            <span className="flex items-center ml-2">
              {product.total_comments}
              <AiOutlineComment className="text-light-primary"></AiOutlineComment>
            </span>
          </div>
        </div>
      </div>
      <CommentsComponents comments={product.comments}></CommentsComponents>
      <style jsx>{`
        .img_prod {
          max-height: 200px;
        }
      `}</style>
    </div>
  );
};

export default Product;
