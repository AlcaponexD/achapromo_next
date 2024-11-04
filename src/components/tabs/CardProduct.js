import Link from "next/link";
import {
  string_to_slug,
  formatarReal,
  translateDatePtBr,
} from "../../utils/helper";

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
    <Link href={dataLink}>
      <div className="flex p-2 border-2 dark:border-dark-sidebar mt-4 dark:bg-dark-sidebar bg-white rounded-2xl">
        <div className="flex items-center w-[160px] border-r-2 dark:border-dark-sidebar">
          <img className="img_prod w-full" src={product.avatar}></img>
        </div>
        <div className="w-5/6 p-4">
          <div className="flex justify-between">
            <h1 className="font-bold lg:text-lg text-xs">{product.title}</h1>
            <h2 className="text-dark-primary lg:text-2xl text-base font-bold">
              {formatarReal(product.price / 100)}
            </h2>
          </div>
          <p className="md:text-base b  sm:text-sm line-clamp-3">
            {product.description}
          </p>
          <div className="flex justify-between flex-wrap">
            <span className="text-xs mt-2 flex justify-center flex-col">
              {translateDatePtBr(product.created_at)}
              <span className="text-base font-semibold text-dark-primary mt-2">
                {product.store.title}
              </span>
            </span>

            <div className="flex justify-between flex-wrap">
              <span className="bg-light-primary rounded p-2 m-2 px-4">
                {product ? product.comments.length : 0} Comentarios
              </span>
              <span className="bg-yellow-500 rounded m-2 p-2 px-4">
                {product ? product.classification ?? 0 : 0} Stars
              </span>
              <span className="bg-blue-600 hover:bg-blue-900 m-2 rounded p-2 px-4">
                Ver produto
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link >
  );
};
