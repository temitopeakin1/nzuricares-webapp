import React, { useState, useEffect } from 'react';

const PrivacyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isBannerAccepted = localStorage.getItem('privacyBannerAccepted');
    if (!isBannerAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('privacyBannerAccepted', 'true');
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('privacyBannerAccepted', 'true');
    setIsVisible(false);
  };

  // const handleCustomize = () => {
  //   // Logic to handle customization can be added here
  // };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">We value your privacy</h2>
          <p className="text-sm mt-1">
            We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {/* <button
            onClick={handleCustomize}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Customize All
          </button> */}
          <button
            onClick={handleRejectAll}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reject All
          </button>
          <button
            onClick={handleAcceptAll}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyBanner;
