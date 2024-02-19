import { useRouter } from "next/router";
import axios from '../../src/config/axiosConfig'

const Search = () => {
    const router = new useRouter();

    const { term } = router.query
    axios.get("/products/search", {
        params: {
            search: term,
            page: 1,
            per_page: 10
        }
    }).then((response) => {
        console.log(response.data)
    })
    return (
        <div>Teste</div>
    )
}

export default Search