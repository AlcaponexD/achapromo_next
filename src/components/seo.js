import Head from 'next/head';
import Script from 'next/script';

export default function SEO({ title, description, image, url, jsonLdData, updatedTime }) {
    // Gerar data de atualização se não for fornecida
    const lastModified = updatedTime || new Date().toISOString();

    // Default JSON-LD para o site
    const defaultJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AchaPromo",
        "url": url,
        "description": description,
        "dateModified": lastModified,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://achapromo.com.br/buscar/{search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    // Usar JSON-LD personalizado se fornecido, caso contrário usar o padrão
    const jsonLd = jsonLdData || defaultJsonLd;

    // Adicionar dateModified ao JSON-LD se não estiver presente
    if (!jsonLd.dateModified) {
        jsonLd.dateModified = lastModified;
    }

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="theme-color" content="#4F46E5" />
            <meta name="keywords" content="promoções, hardware, periféricos, comparação de preços, histórico de preços, ofertas de informática" />
            <meta name="language" content="pt-BR" />
            <meta name="revisit-after" content="1 days" />

            {/* Meta tag Last-Modified para indicar quando o conteúdo foi atualizado */}
            <meta httpEquiv="Last-Modified" content={lastModified} />

            {/* Open Graph (Facebook, LinkedIn) */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:site_name" content="AchaPromo" />
            <meta property="og:updated_time" content={lastModified} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Outras Tags */}
            <meta name="author" content="AchaPromo" />
            <meta name="robots" content="index, follow, max-image-preview:large" />
            <link rel="canonical" href={url} />
            <link rel="alternate" hrefLang="pt-BR" href={url} />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Script
                id="gtm-head"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,l){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'}); 
            var f=d.createElement(s), j=d.getElementsByTagName(s)[0]; f.async=true; 
            f.src='https://www.googletagmanager.com/gtm.js?id=GTM-KLK5JJX3'; 
            j.parentNode.insertBefore(f,j);
          })(window, 'dataLayer');
          `,
                }}
            />
        </Head>
    );
}
