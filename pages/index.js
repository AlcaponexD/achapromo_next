import Layout from "../src/components/Layout";
import Cabecalho from "../src/components/cabecalho";
import Categories from "../src/components/categories";
import FeaturedProducts from "../src/components/tabs/FeaturedProducts";
const Index = (props) => {
  return (
    <Layout>
      <div>
        <Cabecalho />
        <main className="">
          <Categories></Categories>
          <FeaturedProducts></FeaturedProducts>
        </main>
        <style jsx>{`
          li {
            font-size: ${props.size}rem;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Index;
