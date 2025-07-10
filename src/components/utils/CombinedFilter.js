import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

const CombinedFilter = ({ onFilterChange, initialFrom = '', initialTo = '', initialCategory = '' }) => {
  // Estados para preço
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  
  // Estados para categoria
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para controle de expansão
  const [isExpanded, setIsExpanded] = useState(false);

  // Buscar categorias da API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/categories');
        const sortedCategories = (response.data || []).sort((a, b) => 
          a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
        );
        setCategories(sortedCategories);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        setError('Erro ao carregar categorias');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Função para aplicar máscara de preço em real
  const formatCurrency = (value) => {
    if (!value) return '';

    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');

    if (!numbers) return '';

    // Converte para centavos e depois para reais
    const amount = parseFloat(numbers) / 100;

    // Formata como moeda brasileira
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  };

  // Função para remover máscara e converter valor para número
  const parsePrice = (value) => {
    if (!value || value.trim() === '') return null;

    // Remove símbolos de moeda, espaços e pontos de milhares
    const cleanValue = value.toString()
      .replace(/R\$\s?/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim();

    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) || parsed < 0 ? null : parsed;
  };

  // Função para converter para formato da API (multiplicado por 100)
  const convertToApiFormat = (value) => {
    const parsed = parsePrice(value);
    return parsed !== null ? Math.round(parsed * 100) : null;
  };

  // Manipulador de mudança com máscara
  const handleInputChange = (value, setter) => {
    const formatted = formatCurrency(value);
    setter(formatted);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    applyFilters(from, to, categoryId);
  };

  const applyFilters = (fromValue = from, toValue = to, categoryValue = selectedCategory) => {
    const filters = {};

    // Filtros de preço
    const fromPrice = convertToApiFormat(fromValue);
    const toPrice = convertToApiFormat(toValue);

    if (fromPrice !== null) {
      filters.from = fromPrice;
    }

    if (toPrice !== null) {
      filters.to = toPrice;
    }

    // Validação: 'from' não pode ser maior que 'to'
    if (fromPrice !== null && toPrice !== null && fromPrice > toPrice) {
      alert('O valor mínimo não pode ser maior que o valor máximo.');
      return;
    }

    // Filtro de categoria
    if (categoryValue && categoryValue !== '') {
      filters.category = categoryValue;
    }

    onFilterChange(filters);
  };

  const handleApplyFilter = () => {
    applyFilters();
  };

  const handleClearFilter = () => {
    setFrom('');
    setTo('');
    setSelectedCategory('');
    onFilterChange({});
  };

  const hasActiveFilters = from || to || (selectedCategory && selectedCategory !== '');
  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.title || '';

  if (loading) {
    return (
      <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-sidebar">
        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
          Carregando filtros...
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-sidebar">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Filtros
          </span>
          {hasActiveFilters && (
            <div className="flex gap-1">
              {(from || to) && (
                <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                  Preço
                </span>
              )}
              {selectedCategory && (
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {selectedCategoryName}
                </span>
              )}
            </div>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-3 space-y-4">
            {/* Filtro de Categoria */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Categoria
              </h3>
              {error ? (
                <div className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              ) : (
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Filtro de Preço */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Faixa de Preço
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Preço Mínimo (R$)
                  </label>
                  <input
                    type="text"
                    placeholder="R$ 10,50"
                    value={from}
                    onChange={(e) => handleInputChange(e.target.value, setFrom)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Preço Máximo (R$)
                  </label>
                  <input
                    type="text"
                    placeholder="R$ 100,50"
                    value={to}
                    onChange={(e) => handleInputChange(e.target.value, setTo)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2 pt-2 justify-end">
              <button
                onClick={handleApplyFilter}
                className="max-w-[250px] flex-1 px-4 py-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:ring-offset-2"
              >
                Aplicar Filtros
              </button>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilter}
                  className="max-w-[250px] px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Limpar Tudo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedFilter;