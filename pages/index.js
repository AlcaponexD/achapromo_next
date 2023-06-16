import Layout from "../src/components/Layout";
import Cabecalho from "../src/components/cabecalho";

const Index = (props) => (
  <Layout>
    <div>
      <Cabecalho />
      <main className="">
        <div>Testando bg</div>

        <div>Testando bg</div>

        <div>Testando bg</div>
        <div>Testando bg</div>
        <div>Testando bg</div>
      </main>
      <style jsx>{`
        li {
          font-size: ${props.size}rem;
        }
      `}</style>
    </div>
  </Layout>
);

export default Index;
