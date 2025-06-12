import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch, FaExclamationCircle, FaTools } from 'react-icons/fa';
import SEO from '../src/components/seo';

const Custom500 = () => {
  return (
    <>
      <SEO
        title="Erro interno do servidor - 500 | Achapromo"
        description="Ocorreu um erro interno no servidor. Nossa equipe foi notificada e está trabalhando para resolver o problema."
        url="/500"
      />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        {/* Ícone de erro */}
        <div className="mb-8">
          <FaExclamationCircle className="text-8xl text-red-500 dark:text-red-400 mx-auto mb-4" />
          <div className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-2">
            500
          </div>
        </div>

        {/* Título e descrição */}
        <div className="mb-8 max-w-md">
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
            Erro interno do servidor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ops! Algo deu errado em nossos servidores. Nossa equipe foi notificada e está trabalhando para resolver o problema.
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

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary px-6 py-3 rounded-lg hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary dark:hover:text-white transition-colors duration-200 font-medium"
          >
            <FaTools className="text-lg" />
            Tentar Novamente
          </button>
        </div>

        {/* Informações adicionais */}
        <div className="text-center mb-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>O que você pode fazer:</strong>
            </p>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
              <li>• Aguarde alguns minutos e tente novamente</li>
              <li>• Verifique sua conexão com a internet</li>
              <li>• Entre em contato conosco se o problema persistir</li>
            </ul>
          </div>
        </div>

        {/* Links úteis */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Enquanto isso, explore essas seções:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/categoria/todos" className="text-light-primary dark:text-dark-primary hover:underline">
              Todas as Categorias
            </Link>
            <Link href="http://blog.achapromo.com.br" className="text-light-primary dark:text-dark-primary hover:underline">
              Blog
            </Link>
          </div>
        </div>

        {/* Decoração adicional */}
        <div className="mt-12 opacity-20">
          <div className="text-6xl font-bold text-red-500 dark:text-red-400">
            (╯°□°╯）
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom500;