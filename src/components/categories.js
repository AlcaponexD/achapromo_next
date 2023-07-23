export default () => {
  const categories = [
    "Eletrônicos",
    "Games e PC Gamer",
    "Casa e cozinha",
    "Moda",
    "Livros,filmes e musica",
    "Saúde e beleza",
    "Supermercado",
    "Esportes e exercicios",
    "gratis",
    "Financas",
    "Familia e criancas",
    "Delivery",
    "Viagens",
    "Carros e motos",
    "Ferramentas e jardim",
    "Internet",
  ];
  return (
    <ul className="flex flex-wrap justify-center ">
      {categories.map((category, index) => {
        return (
          <li
            key={index}
            className="mr-4 mt-2 p-2 border dark:border-dark-sidebar hover:bg-slate-300 hover:dark:text-light-primary dark:text-dark-text hover:text-dark-primary text-light-text  rounded-lg"
          >
            <a href="#">{category}</a>
          </li>
        );
      })}
    </ul>
  );
};
