import { useRouter } from "next/router";
import axios from '../../src/config/axiosConfig'
import { useEffect, useState } from "react";
import CardProduct from '../../src/components/tabs/CardProduct'
import Pagination from "../../src/components/utils/pagination";
import OrderSelect from "../../src/components/utils/OrderSelect";

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
        <div>
            <OrderSelect orderBy={orderBy} orderDirection={orderDirection} onChange={handleOrderChange} />
            {products.length < 1 ? `Nada encontrado com a palavra ${term}` : null}
            {products.map((product, index) => {
                return <CardProduct product={product} key={index}></CardProduct>;
            })}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default Search