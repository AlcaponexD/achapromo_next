export default ({ product }) => {
  return (
    <div className="flex p-2 border-2 dark:border-dark-sidebar mt-4">
      <div className="flex items-center w-1/6 border-r-2 dark:border-dark-sidebar">
        <img className="img_prod w-full" src={product.image}></img>
      </div>
      <div className="w-5/6 p-4">
        <h1 className="text-lg font-bold">{product.title}</h1>
        <p className="md:text-base sm:text-sm line-clamp-3">
          {product.description}
        </p>
        <div className="flex justify-between flex-wrap">
          <span className="text-xs mt-2">{product.update}</span>
          <div className="flex justify-between flex-wrap">
            <span className="bg-light-primary rounded p-1 m-2">
              {product.total_comments} Comentarios
            </span>
            <span className="bg-yellow-500 rounded m-2 p-1">
              {product.total_stars} Stars
            </span>
            <span className="bg-blue-600 m-2 rounded p-1">Ver produto</span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .img_prod {
          }
        `}
      </style>
    </div>
  );
};
