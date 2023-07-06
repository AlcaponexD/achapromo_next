import { useRouter } from "next/router";
import product from "../api/product.json";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";

const Product = ({ query }) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div className="w-full flex justify-between mt-4 max-[600px]:flex-wrap">
      <div className="w-1/3 p-3 flex justify-center">
        <img className="img_prod" src={product.image}></img>
      </div>
      <div className="w-2/3 p-3">
        <h1 className="text-2xl font-bold	text-light-primary">
          {product.title}
        </h1>
        <p>
          Por{" "}
          <span className="text-light-primary cursor-pointer">
            Jeison Pedroso
          </span>
        </p>
        <span className="text-sm">16 horas atrás</span>
        <p
          title={product.description}
          className="text-justify text-base line-clamp-4"
        >
          {product.description}
        </p>
      </div>
      <div className="w-1/5 flex flex-col p-3 text-center content-center">
        <div className="flex flex-col p-2">
          <span className="text-3xl font-bold text-light-primary">
            R$ 760,00
          </span>
        </div>
        <div>
          <button className="bg-light-primary rounded-md p-2 px-8 text-white hover:bg-light-secondary">
            Pegar promo
          </button>
        </div>
        <div className="flex justify-center text-2xl">
          <span className="flex items-center">
            {product.total_stars}{" "}
            <AiFillStar className="text-light-primary"></AiFillStar>
          </span>
          <span className="flex items-center ml-2">
            {product.total_comments}
            <AiOutlineComment className="text-light-primary"></AiOutlineComment>
          </span>
        </div>
      </div>
      <style jsx>{`
        .img_prod {
          height: 200px;
        }
      `}</style>
    </div>
  );
};

export default Product;
