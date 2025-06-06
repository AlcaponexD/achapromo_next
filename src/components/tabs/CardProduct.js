import Link from "next/link";
import {
  string_to_slug,
  formatarReal,
} from "../../utils/helper";
import DiscountBadge from "../products/DiscountBadge";
import { FaStar, FaComments, FaStore } from "react-icons/fa";

export default (props) => {
  const product = props.product;
  const product_slug = string_to_slug(product.title);

  let dataLink = {
    pathname: "/produto/[slug]/[id]",
    query: { id: product.id, slug: product_slug },
  };

  if (props.dataLink) {
    dataLink = props.dataLink;
  }

  return (
    <Link
      href={dataLink}
      title={product.title}
      className="block transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-light-primary rounded-2xl group"
    >
      <div className="flex flex-col md:flex-row p-4 mt-4 dark:bg-dark-sidebar bg-white rounded-2xl relative shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-dark-primary">
        <DiscountBadge percentage={product.discount_percentage} />

        <div className="flex items-center justify-center w-full md:w-[180px] md:border-r-2 dark:border-dark-sidebar p-2 mb-4 md:mb-0">
          <div className="relative w-full aspect-square max-w-[180px] overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              src={product.avatar}
              alt={product.title}
              title={product.title}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
            <h2 className="font-bold text-sm md:text-lg xl:text-xl text-dark-primary dark:text-white line-clamp-2 group-hover:text-light-primary transition-colors duration-300">
              {product.title}
            </h2>
            <h3 className="text-dark-primary text-lg md:text-2xl font-bold whitespace-nowrap">
              {formatarReal(product.price / 100)}
            </h3>
          </div>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {product.description}
          </p>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <FaStore className="text-light-primary" /> Vendido por
              <span className="text-base font-semibold text-dark-primary dark:text-gray-200">
                {product.store.title}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
              <span className="inline-flex items-center gap-2 bg-light-primary/10 text-light-primary rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 hover:bg-light-primary/20 w-full md:w-auto justify-center md:justify-start group-hover:bg-light-primary/20">
                <FaComments />
                {product.comments_count} Comentários
              </span>
              <span className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 hover:bg-yellow-500/20 w-full md:w-auto justify-center md:justify-start">
                <FaStar />
                {product ? product.classification ?? 0 : 0} Estrelas
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 hover:bg-blue-700 w-full md:w-auto justify-center md:justify-start group-hover:bg-blue-700">
                Ver produto
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
