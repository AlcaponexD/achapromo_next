import React, { useEffect, useRef, useState } from 'react';

const AdSenseCard = ({ adClient = "ca-pub-5495811870853736", adSlot = "6992871410", adFormat = 'auto', adResponsive = 'true' }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        // Verificar se o script do AdSense foi carregado
        if (typeof window === 'undefined') {
          console.log('Window não disponível (SSR)');
          return;
        }

        if (!window.adsbygoogle) {
          console.log('Script do AdSense não carregado');
          setError('Script do AdSense não disponível');
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

    // Delay para garantir que o script foi carregado
    timeoutRef.current = setTimeout(pushAd, 500);

    // Cleanup adequado
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [adSlot]);

  if (error) {
    return (
      <div className="my-4 p-4 shadow-lg rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 text-center flex flex-col justify-center items-center min-h-[250px] w-full max-w-full">
        <div className="mb-3">
          <svg className="w-12 h-12 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-blue-800 font-semibold text-lg mb-2">📢 Apoie o AchaPromo!</h3>
        <p className="text-blue-700 text-sm mb-3 max-w-sm leading-relaxed">
          Para manter nosso site <strong>online</strong> e continuar ajudando você a encontrar as melhores ofertas, precisamos da sua ajuda!
        </p>
        <div className="bg-white/70 rounded-lg p-3 mb-3 border border-blue-200">
          <p className="text-blue-800 text-sm font-medium mb-1">🛡️ AdBlock detectado</p>
          <p className="text-blue-600 text-xs">
            Considere desabilitar seu bloqueador de anúncios para o AchaPromo. Nossos anúncios são seguros e relevantes!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 text-xs text-blue-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Anúncios seguros
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Conteúdo gratuito
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            Melhores ofertas
          </span>
        </div>
      </div>
    );
  }

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
      ></ins>
    </div>
  );
};

export default AdSenseCard;