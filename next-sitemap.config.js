const axios = require('axios');

function string_to_slug(str) {
    str = str.trim().toLowerCase();
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";
    for (let i = 0; i < from.length; i++) {
        str = str.replace(new RegExp(from[i], 'g'), to[i]);
    }
    return str
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

module.exports = {
    siteUrl: 'https://www.achapromo.com.br',
    generateRobotsTxt: false, // Agora gerando automaticamente
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: [
        '/blog',
        '/perfil/editar',
        '/perfil/review',
        '/produto/novo',
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    additionalPaths: async () => {
        const paths = [];

        const endProds = ['tops', 'recommends', 'news'];

        for (const tipo of endProds) {
            const produtos = await fetchAllProducts(tipo);
            for (const p of produtos) {
                paths.push({
                    loc: `/produto/${string_to_slug(p.title)}/${p.id}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily',
                    priority: 0.7,
                });
            }
        }

        const categories = await fetchAllCategories();
        for (const c of categories) {
            paths.push({
                loc: `/categoria/${string_to_slug(c.title)}/${c.id}`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.7,
            });
        }

        return paths;
    },
};

async function fetchAllCategories() {
    try {
        const { data } = await axios.get('https://api.achapromo.com.br/categories');
        return data || [];
    } catch (err) {
        console.error('[SITEMAP] Falha ao buscar categorias:', err.message);
        return [];
    }
}

async function fetchAllProducts(tipo) {
    const produtos = [];
    const perPage = 100;
    let page = 1;

    while (true) {
        try {
            const { data } = await axios.get(`https://api.achapromo.com.br/products/${tipo}`, {
                params: { page, per_page: perPage },
            });

            if (!data.products || data.products.length === 0) break;

            produtos.push(...data.products);
            if (data.products.length < perPage) break;

            page++;
        } catch (err) {
            console.error(`[SITEMAP] Erro ao buscar produtos (${tipo}):`, err.message);
            break;
        }
    }

    return produtos;
}
