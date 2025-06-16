import React, { useEffect, useRef } from 'react';

const AdSenseCard = ({ adClient = "ca-pub-5495811870853736", adSlot, adFormat = 'auto', adResponsive = 'true' }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
          console.log('Pushing ad for slot:', adSlot);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('Error pushing AdSense ad:', e);
      }
    };

    // Pequeno delay para garantir que o script global esteja carregado
    const timer = setTimeout(() => {
      pushAd();
    }, 500);

    return () => clearTimeout(timer);
  }, [adSlot]);

  return (
    <div className="my-2 p-4 shadow-lg rounded-lg border border-gray-200 bg-white text-center flex flex-col justify-center items-center h-full min-h-[200px]">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={adResponsive}
      ></ins>
    </div>
  );
};

export default AdSenseCard;