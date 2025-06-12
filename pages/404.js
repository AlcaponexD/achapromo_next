import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import SEO from '../src/components/seo';

const Custom404 = () => {
  return (
    <>
      <SEO
        title="Página não encontrada - 404 | Achapromo"
        description="A página que você está procurando não foi encontrada. Volte para a página inicial ou explore nossas promoções."
        url="/404"
      />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        {/* Ícone de erro */}
        <div className="mb-8">
          <FaExclamationTriangle className="text-8xl text-light-secondary dark:text-dark-secondary mx-auto mb-4" />
          <div className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-2">
            404
          </div>
        </div>

        {/* Título e descrição */}
        <div className="mb-8 max-w-md">
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
            Oops! Página não encontrada
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            A página que você está procurando não existe ou foi movida. Que tal explorar nossas promoções?
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 bg-light-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg hover:bg-light-secondary dark:hover:bg-green-600 transition-colors duration-200 font-medium">
              <FaHome className="text-lg" />
              Voltar ao Início
            </button>
          </Link>

          <Link href="/categoria/todos">
            <button className="flex items-center gap-2 border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary px-6 py-3 rounded-lg hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary dark:hover:text-white transition-colors duration-200 font-medium">
              <FaSearch className="text-lg" />
              Ver Promoções
            </button>
          </Link>
        </div>

        {/* Decoração adicional */}
        <div className="mt-12 opacity-20">
          <div className="text-9xl font-bold text-light-primary dark:text-dark-primary">
            ¯\_(ツ)_/¯
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;