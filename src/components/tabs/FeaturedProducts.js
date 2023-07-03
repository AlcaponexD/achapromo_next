import CardProduct from "./CardProduct";

export default (props) => {
  const products = [
    {
      id: 1,
      title: "Produto 1",
      description: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. 
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. 
      This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.`,
      image:
        "https://www.adobe.com/br/express/feature/image/media_142f9cf5285c2cdcda8375c1041d273a3f0383e5f.png?width=750&format=png&optimize=medium",
      update: "last updated 3min ago",
      total_comments: 10,
      total_stars: 8,
    },
    {
      id: 2,
      title: "Produto 2",
      description: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. 
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. 
      This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.`,
      image:
        "https://www.adobe.com/br/express/feature/image/media_142f9cf5285c2cdcda8375c1041d273a3f0383e5f.png?width=750&format=png&optimize=medium",
      update: "last updated 3min ago",
      total_comments: 10,
      total_stars: 8,
    },
    {
      id: 3,
      title: "Produto 3",
      description: `This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. 
      This is a wider card with supporting text below as a natural lead-in to additional content.
      This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. 
      This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.`,
      image:
        "https://www.adobe.com/br/express/feature/image/media_142f9cf5285c2cdcda8375c1041d273a3f0383e5f.png?width=750&format=png&optimize=medium",
      update: "last updated 3min ago",
      total_comments: 10,
      total_stars: 8,
    },
  ];
  return (
    <div>
      {products.map((product, index) => {
        return <CardProduct product={product} key={index}></CardProduct>;
      })}
    </div>
  );
};
