import Script from 'next/script';
import React, { useEffect } from 'react';

const AdSenseCard = ({ adClient = "ca-pub-5495811870853736", adSlot, adFormat = 'auto', adResponsive = 'true' }) => {
  useEffect(() => {
    try {
      console.log('Pushing ad for slot:', adSlot);
      (window.adsbygoogle = window.adsbygoogle || []).push({});

    } catch (e) {
      console.error('Error pushing AdSense ad:', e);
    }
  }, [adSlot]); // Executa quando o adSlot mudar



  return (
    <div className="my-2 p-4 shadow-lg rounded-lg border border-gray-200 bg-white text-center flex flex-col justify-center items-center h-full min-h-[200px]">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient} // Seu ID de editor
        data-ad-slot={adSlot} // O ID do bloco de anúncios específico
        data-ad-format={adFormat}
        data-full-width-responsive={adResponsive}
      ></ins>
      {/* O Script do AdSense é carregado aqui. 
          É importante que o client ID no src do Script corresponda ao data-ad-client na tag <ins> */}
      <Script
        id={`adsense-script-${adSlot}`} // ID único para cada script se houver múltiplos na página
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive" // Garante que o script carregue após a página se tornar interativa
        onLoad={() => {
          console.log('AdSense script loaded for slot:', adSlot);
          // Tentar o push aqui também pode ser uma alternativa, 
          // mas o useEffect é mais robusto para mudanças de props.
        }}
        onError={(e) => {
          console.error('Error loading AdSense script:', e);
        }}
      />
      {/* <p className="text-sm text-gray-500">Carregando anúncio...</p> */}
    </div>
  );
};

export default AdSenseCard;