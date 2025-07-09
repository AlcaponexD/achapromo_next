import { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

const CategoryFilter = ({ onFilterChange, initialCategory = '' }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Buscar categorias da API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/categories');
                setCategories(response.data || []);
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

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);

        // Enviar filtro para o componente pai
        const filters = {};
        if (categoryId && categoryId !== '') {
            filters.category = categoryId;
        }

        onFilterChange(filters);
    };

    const handleClearFilter = () => {
        setSelectedCategory('');
        onFilterChange({});
    };

    const hasActiveFilter = selectedCategory && selectedCategory !== '';
    const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.title || '';

    if (loading) {
        return (
            <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-sidebar">
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    Carregando categorias...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-4 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
                <div className="px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    {error}
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
                        Filtrar por Categoria
                    </span>
                    {hasActiveFilter && (
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                            {selectedCategoryName}
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
                        <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                                Selecione uma categoria:
                            </label>
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
                        </div>

                        {hasActiveFilter && (
                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleClearFilter}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Limpar Filtro
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;