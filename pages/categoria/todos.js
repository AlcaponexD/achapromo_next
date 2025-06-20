import axios from "../../src/config/axiosConfig";
import Link from "next/link";
import SEO from "../../src/components/seo";

const CategoriesPage = ({ categories }) => {
  return (
    <>
      <SEO
        title="Categorias de Produtos | AchaPromo - Compare preços e veja histórico"
        description="Navegue por todas as categorias de produtos de hardware e periféricos no AchaPromo. Compare preços, veja histórico e encontre as melhores ofertas de informática."
        image="/index-min.png"
        url="https://achapromo.com.br/categoria/todos"
        jsonLdData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Todas as Categorias - AchaPromo",
          "description": "Navegue por todas as categorias de produtos disponíveis no AchaPromo e encontre as melhores ofertas.",
          "url": "https://achapromo.com.br/categoria/todos",
          "numberOfItems": categories.length
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Categorias
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={{
                pathname: "/categoria/[slug]/[id]",
                query: { id: category.id, slug: category.slug },
              }}
              className="group"
            >
              <div className="bg-white dark:bg-dark-sidebar rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 border border-gray-100 dark:border-gray-800 hover:border-light-primary dark:hover:border-dark-primary">
                <div className="relative">
                  <h2 className="text-base font-medium text-gray-900 dark:text-white text-center group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors duration-200 pb-2">
                    {category.title}
                  </h2>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-light-primary dark:bg-dark-primary group-hover:w-full transition-all duration-200 -translate-x-1/2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get("/categories");
    return {
      props: {
        categories: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
}

export default CategoriesPage;
