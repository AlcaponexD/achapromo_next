import { useRouter } from "next/router";
import axios from '../../src/config/axiosConfig'
import { useEffect, useState } from "react";
import CardProduct from '../../src/components/tabs/CardProduct'
import Pagination from "../../src/components/utils/pagination";
import OrderSelect from "../../src/components/utils/OrderSelect";
import SEO from '../../src/components/seo';

const Search = () => {
    const router = new useRouter();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState("price");
    const [orderDirection, setOrderDirection] = useState("asc");
    const per_page = 10;
    const { term } = router.query;

    const getProducts = (order_by = orderBy, order_direction = orderDirection, page = currentPage) => {
        axios.get("/products/search", {
            params: {
                search: term,
                page,
                per_page,
                order_by,
                order_direction
            }
        }).then((response) => {
            setProducts(response.data.products);
            setTotalPages(response.data.total);
        })
    }

    const handleOrderChange = ({ order_by, order_direction }) => {
        setOrderBy(order_by);
        setOrderDirection(order_direction);
        setCurrentPage(1);
        getProducts(order_by, order_direction, 1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getProducts(orderBy, orderDirection, page);
    }

    useEffect(() => {
        getProducts(orderBy, orderDirection, currentPage);
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
                <OrderSelect orderBy={orderBy} orderDirection={orderDirection} onChange={handleOrderChange} />
                <div className="mt-4">
                    {products.map((product, index) => (
                        <CardProduct product={product} key={index} />
                    ))}
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