import { useRouter } from "next/router";
import axios from '../../src/config/axiosConfig'
import { useEffect, useState } from "react";
import CardProduct from '../../src/components/tabs/CardProduct'
import Pagination from "../../src/components/utils/pagination";

const Search = () => {
    const router = new useRouter();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const per_page = 10;
    const { term } = router.query;

    const getProducts = () => {
        axios.get("/products/search", {
            params: {
                search: term,
                page: currentPage,
                per_page
            }
        }).then((response) => {
            setProducts(response.data.products);
            setTotalPages(response.data.total);
        })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        getProducts();
    }, [term, currentPage]);

    return (
        <div>
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