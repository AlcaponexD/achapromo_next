import Head from 'next/head';

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
        </Head>
    );
}
