import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const BannerAdComponent = () => {
  // Replace this with your actual banner ad unit ID from AdMob
  const adUnitId = TestIds.BANNER; // This is the test ad unit ID

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId} // Use TestIds.BANNER for testing purposes
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, // Optional for GDPR compliance
        }}
        onAdLoaded={() => console.log('Test Banner ad loaded successfully')}
        onAdFailedToLoad={error =>
          console.error('Test Banner ad failed to load:', error)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default BannerAdComponent;
