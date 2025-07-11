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
        '/perfil/top',
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
        console.log('[SITEMAP] Iniciando geração do sitemap...');

        // 1. Produtos por tipo (tops, recommends, news)
        const endProds = ['tops', 'recommends', 'news'];
        console.log('[SITEMAP] Buscando produtos por tipo...');

        for (const tipo of endProds) {
            const produtos = await fetchAllProducts(tipo);
            console.log(`[SITEMAP] Encontrados ${produtos.length} produtos do tipo ${tipo}`);

            for (const p of produtos) {
                if (p.id && p.title) {
                    const product_payload = {
                        loc: `/produto/${string_to_slug(p.title)}/${p.id}`,
                        lastmod: new Date().toISOString(),
                        changefreq: 'daily',
                        priority: 0.8,
                        images: []
                    };
                    paths.push(product_payload);
                }
            }
        }

        // 2. Todas as categorias
        console.log('[SITEMAP] Buscando categorias...');
        const categories = await fetchAllCategories();
        console.log(`[SITEMAP] Encontradas ${categories.length} categorias`);

        for (const c of categories) {
            if (c.id && c.title) {
                paths.push({
                    loc: `/categoria/${string_to_slug(c.title)}/${c.id}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily',
                    priority: 0.7,
                });
            }
        }

        // 3. Todas as lojas
        console.log('[SITEMAP] Buscando lojas...');
        const stores = await fetchAllStores();
        console.log(`[SITEMAP] Encontradas ${stores.length} lojas`);

        for (const s of stores) {
            if (s.id && s.title) {
                paths.push({
                    loc: `/loja/${string_to_slug(s.title)}/${s.id}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'daily',
                    priority: 0.7,
                });

                // 4. Produtos específicos de cada loja
                console.log(`[SITEMAP] Buscando produtos da loja: ${s.title}`);
                const storeProducts = await fetchProductsByStore(s.id);
                console.log(`[SITEMAP] Encontrados ${storeProducts.length} produtos da loja ${s.title}`);

                for (const p of storeProducts) {
                    if (p.id && p.title) {
                        const product_payload = {
                            loc: `/produto/${string_to_slug(p.title)}/${p.id}`,
                            lastmod: new Date().toISOString(),
                            changefreq: 'weekly',
                            priority: 0.6,
                            images: []
                        };


                        // Evitar duplicatas verificando se já existe
                        const exists = paths.some(path => path.loc === product_payload.loc);
                        if (!exists) {
                            paths.push(product_payload);
                        }
                    }
                }
            }
        }

        console.log(`[SITEMAP] Total de URLs geradas: ${paths.length}`);
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

async function fetchAllStores() {
    try {
        const { data } = await axios.get('https://api.achapromo.com.br/store');
        return data || [];
    } catch (err) {
        console.error('[SITEMAP] Falha ao buscar lojas:', err.message);
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

            // Debug: verificar estrutura dos produtos
            if (produtos.length === 0 && data.products.length > 0) {
                console.log('[SITEMAP DEBUG] Estrutura do primeiro produto:', JSON.stringify(data.products[0], null, 2));
            }

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

async function fetchProductsByStore(storeId) {
    const produtos = [];
    const perPage = 1000;
    let page = 1;
    const maxPages = 99; // Limitar para evitar timeout

    while (page <= maxPages) {
        try {
            const { data } = await axios.get(`https://api.achapromo.com.br/store/${storeId}`, {
                params: { page, per_page: perPage },
            });

            if (!data.products || data.products.length === 0) break;

            produtos.push(...data.products);
            if (data.products.length < perPage) break;

            page++;
        } catch (err) {
            console.error(`[SITEMAP] Erro ao buscar produtos da loja ${storeId}:`, err.message);
            break;
        }
    }

    return produtos;
}