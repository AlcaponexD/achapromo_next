import { useRouter } from "next/router";
import axios from '../../src/config/axiosConfig'
import { useEffect, useState } from "react";
import CardProduct from '../../src/components/tabs/CardProduct'

const Search = () => {
    const router = new useRouter();
    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(false);
    const [page, setPage] = useState(1);
    let per_page = 1
    let last_term_searched;
    const { term } = router.query;

    const getProducts = () => {
        axios.get("/products/search", {
            params: {
                search: term,
                page,
                per_page
            }
        }).then((response) => {
            last_term_searched = term;
            setProducts(response.data.products);
            setNextPage(response.data.next_page);
        })
    }

    const paginate = (type) => {
        if (type === 'next') {
            setPage(prevPage => prevPage + 1);
        } else {
            setPage(prevPage => prevPage - 1);
        }

    }


    useEffect(() => {
        getProducts();
    }, [term, page]);
    return (
        <div>
            {products.map((product, index) => {
                return <CardProduct product={product} key={index}></CardProduct>;
            })}
            <div className="flex justify-end">
                <ul className="flex flex-row gap-1">
                    {page > 1 ?
                        <li className={1 === 1 ? 'bg-dark-primary px-2 border border-dark-primary rounded-sm' : 'px-1 border border-dark-primary rounded-sm'}>
                            <button onClick={() => paginate("previews")}>Anterior</button>
                        </li>
                        :
                        null
                    }

                    {nextPage ?
                        <li className={1 === 1 ? 'bg-dark-primary px-2 border border-dark-primary rounded-sm' : 'px-1 border border-dark-primary rounded-sm'}>
                            <button onClick={() => paginate("next")}>Próximo</button>
                        </li>
                        : null
                    }
                </ul>
            </div>
        </div>
    )
}

export default Search   