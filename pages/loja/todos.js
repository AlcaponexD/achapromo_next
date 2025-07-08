import SEO from '../../src/components/seo';
import Link from 'next/link';
import axios from '../../src/config/axiosConfig';

function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

const StoresPage = ({ stores }) => {
    return (
        <>
            <SEO
                title="Todas as Lojas Parceiras | AchaPromo"
                description="Confira todas as lojas parceiras do AchaPromo. Encontre ofertas e promoções nas melhores lojas online do Brasil."
                url="https://achapromo.com.br/loja/todos"
                image="/favicon.ico"
            />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Lojas Parceiras
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {stores.map((store) => (
                        <Link
                            key={store.id}
                            href={{
                                pathname: "/loja/[slug]/[id]",
                                query: { id: store.id, slug: string_to_slug(store.title) },
                            }}
                            className="group"
                        >
                            <div className="bg-white dark:bg-dark-sidebar rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 dark:border-gray-800 hover:border-light-primary dark:hover:border-dark-primary h-full">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center">
                                        <img
                                            src={store.avatar}
                                            alt={store.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="relative mb-3">
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors duration-200">
                                            {store.title}
                                        </h2>
                                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-light-primary dark:bg-dark-primary group-hover:w-full transition-all duration-200 -translate-x-1/2" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    try {
        const response = await axios.get('/store');
        const stores = response.data.map((store) => {
            return {
                ...store,
                avatar: `/${store.title.toLowerCase()}.png`
            };
        });


        return {
            props: {
                stores
            }
        };
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

export default StoresPage;