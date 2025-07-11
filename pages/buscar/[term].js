import { useRouter } from "next/router";
import axios from '../../src/config/axiosConfig'
import { useEffect, useState } from "react";
import CardProduct from '../../src/components/tabs/CardProduct';
// import AdSenseCard from '../../src/components/tabs/AdSenseCard';
import Pagination from "../../src/components/utils/pagination";
import OrderSelect from "../../src/components/utils/OrderSelect";
import PriceFilter from '../../src/components/utils/PriceFilter';
import SEO from '../../src/components/seo';

const Search = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState("price");
    const [orderDirection, setOrderDirection] = useState("asc");
    const [priceFilters, setPriceFilters] = useState({});
    const per_page = 10;
    const { term } = router.query;

    const getProducts = (order_by = orderBy, order_direction = orderDirection, page = currentPage, filters = priceFilters) => {
        const params = {
            search: term,
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

        axios.get("/products/search", {
            params
        }).then((response) => {
            setProducts(response.data.products);
            setTotalPages(response.data.total);
        })
    }

    const handleOrderChange = ({ order_by, order_direction }) => {
        setOrderBy(order_by);
        setOrderDirection(order_direction);
        setCurrentPage(1);
        getProducts(order_by, order_direction, 1, priceFilters);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getProducts(orderBy, orderDirection, page, priceFilters);
    }

    const handleFilterChange = (filters) => {
        setPriceFilters(filters);
        setCurrentPage(1);
        getProducts(orderBy, orderDirection, 1, filters);
    }

    useEffect(() => {
        getProducts(orderBy, orderDirection, currentPage, priceFilters);
    }, [term, currentPage]);

    return (
        <>
            <SEO
                title={`Resultados para "${term || ''}" | AchaPromo`}
                description={`Veja ofertas e promoções encontradas para "${term || ''}". Compare preços, confira histórico e encontre o melhor negócio em tecnologia.`}
                url={`https://achapromo.com.br/buscar/${term || ''}`}
                image={products[0]?.image || '/favicon.ico'}
            />
            <div>
                <h1 className="text-2xl font-bold mb-2">{products.length > 0 ? `Resultados para "${term}"` : `Nada encontrado para "${term}"`}</h1>
                <p className="mb-4 text-gray-600">
                    {products.length > 0
                        ? `${products.length} produto${products.length > 1 ? 's' : ''} encontrado${products.length > 1 ? 's' : ''} para "${term}".`
                        : `Tente buscar por outro termo ou confira as categorias.`}
                </p>
                <div className="flex flex-col gap-4 mb-4">
                    <PriceFilter onFilterChange={handleFilterChange} />
                    <OrderSelect orderBy={orderBy} orderDirection={orderDirection} onChange={handleOrderChange} />
                </div>
                <div className="mt-4">
                    {products.flatMap((product, index) => {
                        const items = [<CardProduct product={product} key={product.id || `product-${index}`} />];
                        // if ((index + 1) % 7 === 0) {
                        //     items.push(<AdSenseCard key={`adsense-search-${index}`} adSlot="1051614758" adFormat="fluid" adLayoutKey="-e1-5a+hn-rt+au" />);
                        // }
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
    )
}

export default Search