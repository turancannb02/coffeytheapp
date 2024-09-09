import {useEffect, useState} from 'react';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const useInterstitialAd = () => {
  const [loaded, setLoaded] = useState(false);
  const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-2712161373844149/your-interstitial-unit-id';

  const interstitialAd = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    const unsubscribeLoaded = interstitialAd.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      } else if (type === AdEventType.CLOSED) {
        interstitialAd.load(); // Prepare the next ad
        setLoaded(false);
      }
    });

    // Load the first ad
    interstitialAd.load();

    return unsubscribeLoaded;
  }, [interstitialAd]);

  const showAd = () => {
    if (loaded) {
      interstitialAd.show();
    }
  };

  return {showAd, loaded};
};

export default useInterstitialAd;
