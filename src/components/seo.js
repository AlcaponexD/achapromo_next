import Head from 'next/head';
import Script from 'next/script';

export default function SEO({ title, description, image, url }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" sizes="any" />

            {/* Open Graph (Facebook, LinkedIn) */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Outras Tags */}
            <meta name="author" content="AchaPromo" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />
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
