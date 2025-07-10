import React, { useEffect, useRef, useState } from 'react';

const AdSenseCard = ({ adClient = "ca-pub-5495811870853736", adSlot, adFormat = 'auto', adResponsive = 'true', adLayoutKey }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!adSlot) {
      setError('AdSlot é obrigatório');
      return;
    }

    return

    const pushAd = () => {
      try {
        // Verificar se o script do AdSense foi carregado
        if (typeof window === 'undefined') {
          console.log('Window não disponível (SSR)');
          return;
        }

        if (!window.adsbygoogle) {
          console.log('Script do AdSense ainda não carregado, tentando novamente...');
          setTimeout(pushAd, 500);
          return;
        }

        if (adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
          console.log('Inicializando anúncio para slot:', adSlot);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (e) {
        console.error('Erro ao carregar anúncio AdSense:', e);
        setError(e.message);
      }
    };

    // Delay para garantir que o DOM esteja pronto
    const timer = setTimeout(pushAd, 1000);

    return () => clearTimeout(timer);
  }, [adSlot]);

  if (error) {
    return (
      <div className="my-4 p-4 shadow-lg rounded-lg border border-red-200 bg-red-50 text-center flex flex-col justify-center items-center min-h-[250px] w-full max-w-full">
        <p className="text-red-600 text-sm">Erro no anúncio: {error}</p>
      </div>
    );
  }

  return (<div></div>)
  return (
    <div className="my-4 p-4 shadow-lg rounded-lg border border-gray-200 bg-white dark:bg-gray-800 text-center flex flex-col justify-center items-center min-h-[250px] w-full max-w-full">
      {!adLoaded && (
        <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          Carregando anúncio...
        </div>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: '200px'
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={adResponsive}
        {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
      ></ins>
    </div>
  );
};

export default AdSenseCard;