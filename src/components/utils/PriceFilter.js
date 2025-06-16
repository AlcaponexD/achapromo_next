import { useState } from 'react';

const PriceFilter = ({ onFilterChange, initialFrom = '', initialTo = '' }) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleApplyFilter = () => {
    const filters = {};

    const fromValue = convertToApiFormat(from);
    const toValue = convertToApiFormat(to);

    if (fromValue !== null) {
      filters.from = fromValue;
    }

    if (toValue !== null) {
      filters.to = toValue;
    }

    // Validação: 'from' não pode ser maior que 'to'
    if (fromValue !== null && toValue !== null && fromValue > toValue) {
      alert('O valor mínimo não pode ser maior que o valor máximo.');
      return;
    }

    onFilterChange(filters);
  };

  const handleClearFilter = () => {
    setFrom('');
    setTo('');
    onFilterChange({});
  };

  const hasActiveFilters = from || to;

  return (
    <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-sidebar">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Filtrar por Preço
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              Ativo
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
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
          <div className="pt-3 space-y-3">
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

            <div className="flex gap-2 pt-2 justify-end">
              <button
                onClick={handleApplyFilter}
                className="max-w-[250px] flex-1 px-4 py-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:ring-offset-2"
              >
                Aplicar Filtro
              </button>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilter}
                  className="max-w-[250px] px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;