import { useRouter } from 'next/router';
import axios from '../../../src/config/axiosConfig';
import { useEffect, useState } from 'react';
import CardProduct from '../../../src/components/tabs/CardProduct';
import AdSenseCard from '../../../src/components/tabs/AdSenseCard';
import Pagination from '../../../src/components/utils/pagination';
import OrderSelect from '../../../src/components/utils/OrderSelect';
import CombinedFilter from '../../../src/components/utils/CombinedFilter';
import SEO from '../../../src/components/seo';

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const response = await axios.get(`/store/${id}`);
    const storeData = response.data;

    return {
      props: {
        store: storeData.products[0].store || {},
        initialProducts: storeData.products || [],
        initialTotalPages: storeData.total || 1
      }
    };
  } catch (error) {
    console.error('Error fetching store data:', error);
  }
}

const StorePage = ({ store, initialProducts, initialTotalPages }) => {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('discount_percentage');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [priceFilters, setPriceFilters] = useState({});
  const [categoryFilters, setCategoryFilters] = useState({});
  const per_page = 10;
  const { id } = router.query;

  const getProducts = (order_by = orderBy, order_direction = orderDirection, page = currentPage, filters = priceFilters, categoryFilter = categoryFilters) => {
    const params = {
      page,
      per_page,
      order_by,
      order_direction
    };

    if (filters.from) {
      params.from = filters.from;
    }
    if (filters.to) {
      params.to = filters.to;
    }
    if (categoryFilter.category) {
      params.category = categoryFilter.category;
    }

    axios.get(`/store/${id}`, {
      params
    }).then((response) => {
      setProducts(response.data.products);
      setTotalPages(response.data.total);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  };

  const handleOrderChange = ({ order_by, order_direction }) => {
    setOrderBy(order_by);
    setOrderDirection(order_direction);
    setCurrentPage(1);
    getProducts(order_by, order_direction, 1, priceFilters, categoryFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getProducts(orderBy, orderDirection, page, priceFilters, categoryFilters);
  };

  const handleFilterChange = (filters) => {
    setPriceFilters({ from: filters.from, to: filters.to });
    setCategoryFilters({ category: filters.category });
    setCurrentPage(1);
    getProducts(orderBy, orderDirection, 1, { from: filters.from, to: filters.to }, { category: filters.category });
  };

  useEffect(() => {
    if (id) {
      getProducts(orderBy, orderDirection, currentPage, priceFilters, categoryFilters);
    }
  }, [id]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  };

  return (
    <>
      <SEO
        title={`Histórico dos produtos ${store.title} | AchaPromo`}
        description={`Histórico dos produtos da ${store.title}. veja histórico e encontre as melhores ofertas em tecnologia.`}
        url={`https://achapromo.com.br/loja/${string_to_slug(store.title)}/${store.id}`}
        image={'/favicon.ico'}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-dark-primary">{store.title}</h1>
              <p className="text-gray-600"> Confira o histórico de produtos encontrados</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <CombinedFilter
            onFilterChange={handleFilterChange}
            initialFrom={priceFilters.from ? (priceFilters.from / 100).toFixed(2).replace('.', ',') : ''}
            initialTo={priceFilters.to ? (priceFilters.to / 100).toFixed(2).replace('.', ',') : ''}
            initialCategory={categoryFilters.category || ''}
          />
          <OrderSelect
            orderBy={orderBy}
            orderDirection={orderDirection}
            onChange={handleOrderChange}
          />
        </div>

        <div className="mt-4">
          {products.flatMap((product, index) => {
            const items = [
              <CardProduct
                product={product}
                key={product.id || `product-${index}`}
              />
            ];

            if (index === 7) {
              items.push(
                <AdSenseCard
                  key={`adsense-store-${index}`}
                />
              );
            }

            return items;
          })}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default StorePage;