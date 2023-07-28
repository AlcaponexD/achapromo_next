import Link from "next/link";
import { string_to_slug, formatarReal } from "../../utils/helper";

export default ({ product }) => {
  const product_slug = string_to_slug(product.title);

  return (
    <Link
      href={{
        pathname: "/produto/[slug]/[id]",
        query: { id: product.id, slug: product_slug },
      }}
    >
      <div className="flex p-2 border-2 dark:border-dark-sidebar mt-4 dark:bg-dark-sidebar bg-white rounded-2xl">
        <div className="flex items-center w-[160px] border-r-2 dark:border-dark-sidebar">
          <img className="img_prod w-full" src={product.avatar}></img>
        </div>
        <div className="w-5/6 p-4">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">{product.title}</h1>
            <h2 className="text-dark-primary text-2xl font-bold">
              {formatarReal(product.price / 100)}
            </h2>
          </div>
          <p className="md:text-base b  sm:text-sm line-clamp-3">
            {product.description}
          </p>
          <div className="flex justify-between flex-wrap">
            <span className="text-xs mt-2">{product.created_at}</span>
            <div className="flex justify-between flex-wrap">
              <span className="bg-light-primary rounded p-1 m-2 px-4">
                {product.total_comments} Comentarios
              </span>
              <span className="bg-yellow-500 rounded m-2 p-1 px-4">
                {product.total_stars} Stars
              </span>
              <span className="bg-blue-600 m-2 rounded p-1 px-4">
                Ver produto
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
