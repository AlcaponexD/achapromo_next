import { useRouter } from "next/router";
import ProductUpdate from "../../../../src/components/products/profile/update";

const Produto = ({ query }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return <ProductUpdate id={id}></ProductUpdate>;
};

export default Produto;
