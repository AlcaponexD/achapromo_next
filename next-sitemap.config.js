const axios = require('axios');
function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

    return str;
}

module.exports = {
    siteUrl: 'https://www.achapromo.com.br',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/blog', '/perfil/editar', '/perfil/review', '/produto/novo'],
    additionalPaths: async () => {

        var endProds = [
            "tops",
            "recommends",
            "news"
        ]
        const lists = [];

        for (const endProd of endProds) {
            const produtos = await fetchAllProducts(endProd);

            produtos.forEach((produto) => {
                lists.push({
                    loc: `/produto/${string_to_slug(produto.title)}/${produto.id}`,
                    changefreq: 'daily',
                    priority: 0.7,
                    lastmod: new Date().toISOString(),
                });
            });
        }

        //Get categories
        const categories = await fetchAllCategories();

        categories.forEach((category) => {
            lists.push({
                loc: `/categoria/${string_to_slug(category.title)}/${category.id}`,
                changefreq: 'daily',
                priority: 0.7,
                lastmod: new Date().toISOString(),
            });
        });
        return lists;
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
};

async function fetchAllCategories() {
    try {
        const response = await axios.get('https://api.achapromo.com.br/categories');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return [];
    }
}

async function fetchAllProducts(endProd) {
    let produtos = [];
    let page = 1;
    const perPage = 100; // Número de produtos por página

    while (true) {
        try {
            const response = await axios.get(`https://api.achapromo.com.br/products/${endProd}`, {
                params: {
                    page,
                    per_page: perPage,
                },
            });

            produtos = produtos.concat(response.data.products);

            if (response.data.products.length < perPage) {
                break;
            }

            page++;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            break;
        }
    }

    return produtos;
}