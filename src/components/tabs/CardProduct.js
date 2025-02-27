import Link from "next/link";
import {
  string_to_slug,
  formatarReal,
  translateDatePtBr,
} from "../../utils/helper";
import DiscountBadge from "../products/DiscountBadge";

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
    <Link href={dataLink} className="block transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-dark-primary rounded-2xl">
      <div className="flex p-4 border-2 dark:border-dark-sidebar mt-4 dark:bg-dark-sidebar bg-white rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
        <DiscountBadge percentage={product.discount_percentage} />
        <div className="flex items-center w-[180px] border-r-2 dark:border-dark-sidebar p-2">
          <img className="w-full h-auto object-contain rounded-lg" src={product.avatar} alt={product.title} loading="lazy"></img>
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
            <h1 className="font-bold text-sm md:text-lg xl:text-xl text-dark-primary dark:text-white line-clamp-2">{product.title}</h1>
            <h2 className="text-dark-primary text-lg md:text-2xl font-bold whitespace-nowrap">
              {formatarReal(product.price / 100)}
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {product.description}
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="hidden md:flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {translateDatePtBr(product.created_at)}
              </span>
              <span className="text-base font-semibold text-dark-primary mt-1">
                {product.store.title}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
              <span className="inline-flex items-center bg-light-primary/10 text-light-primary rounded-full py-1.5 px-4 text-sm font-medium transition-colors hover:bg-light-primary/20 w-full md:w-auto justify-center md:justify-start">
                {product.comments_count} Comentários
              </span>
              <span className="inline-flex items-center bg-yellow-500/10 text-yellow-600 rounded-full py-1.5 px-4 text-sm font-medium transition-colors hover:bg-yellow-500/20 w-full md:w-auto justify-center md:justify-start">
                {product ? product.classification ?? 0 : 0} Estrelas
              </span>
              <span className="inline-flex items-center bg-blue-600 text-white rounded-full py-1.5 px-4 text-sm font-medium transition-colors hover:bg-blue-700 w-full md:w-auto justify-center md:justify-start">
                Ver produto
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
