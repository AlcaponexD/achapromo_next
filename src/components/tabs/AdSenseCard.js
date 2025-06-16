import React, { useEffect, useRef } from 'react';

const AdSenseCard = ({ adClient = "ca-pub-5495811870853736", adSlot, adFormat = 'auto', adResponsive = 'true' }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
          // Verificar se o elemento está visível e tem dimensões
          const rect = adRef.current.getBoundingClientRect();
          const isVisible = rect.width > 0 && rect.height > 0;
          
          if (isVisible) {
            console.log('Pushing ad for slot:', adSlot);
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            console.log('AdSense element not visible yet, retrying...', adSlot);
            // Tentar novamente após um pequeno delay
            setTimeout(pushAd, 200);
          }
        }
      } catch (e) {
        console.error('Error pushing AdSense ad:', e);
      }
    };

    // Delay maior para garantir que o elemento esteja renderizado e visível
    const timer = setTimeout(() => {
      pushAd();
    }, 1000);

    return () => clearTimeout(timer);
  }, [adSlot]);

  return (
    <div className="my-4 p-4 shadow-lg rounded-lg border border-gray-200 bg-white text-center flex flex-col justify-center items-center min-h-[250px] w-full max-w-full">
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