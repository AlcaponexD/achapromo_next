import { useEffect, useState } from "react";
import axios from "../../src/config/axiosConfig";
import CardProduct from "../../src/components/tabs/CardProduct";
import { string_to_slug } from "../../src/utils/helper";

const TopProducts = () => {
  const [products, setProduct] = useState([]);
  const [copied, setCopied] = useState({}); // Para controlar qual item foi copiado

  // Função para copiar texto
  const copiarTexto = (texto, key) => {
    navigator.clipboard.writeText(texto).then(() => {
      setCopied((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [key]: false }));
      }, 1500);
    });
  };

  // Função para gerar o link do produto
  const gerarLink = (product) => {
    return `https://achapromo.com.br/produto/${string_to_slug(product.title)}/${product.id}`;
  };

  // Função para abrir o link em nova aba
  const abrirLink = (product) => {
    window.open(gerarLink(product), "_blank");
  };

  useEffect(() => {
    axios.get("products/show/ranking").then((response) => {
      setProduct(response.data.products);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      {products.map((product, index) => {
        const link = gerarLink(product);
        return (
          <div key={index} style={{ marginBottom: "24px" }}>
            <CardProduct
              product={product}
              dataLink={{
                blank: true,
                pathname: "/produto/[slug]/[id]",
                query: { id: product.id, slug: string_to_slug(product.title) },
              }}
              key={index}
            />
            <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
              <button
                onClick={() => copiarTexto(product.post, `post-${index}`)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "background 0.2s"
                }}
              >
                Copiar post
              </button>
              <button
                onClick={() => copiarTexto(link, `link-${index}`)}
                style={{
                  background: "#059669",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "background 0.2s"
                }}
              >
                Copiar link
              </button>
              <button
                onClick={() => abrirLink(product)}
                style={{
                  background: "#f59e42",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "background 0.2s"
                }}
              >
                Abrir link
              </button>
            </div>
            <div style={{ minHeight: 24 }}>
              {copied[`post-${index}`] && (
                <span style={{ color: "#059669", fontWeight: 500 }}>
                  Copiado com sucesso!
                </span>
              )}
              {copied[`link-${index}`] && (
                <span style={{ color: "#059669", fontWeight: 500 }}>
                  Link copiado com sucesso!
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopProducts;
