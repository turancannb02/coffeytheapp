import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BannerAdComponent = () => {
  // Use TestIds for testing during development
  const adUnitId = TestIds.BANNER; // This is the test banner ad ID

  return (
      <View style={styles.container}>
          <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.FULL_BANNER}
              requestOptions={{}}
              onAdLoaded={() => console.log('Test Banner ad loaded successfully')}
              onAdFailedToLoad={(error) => console.error('Test Banner ad failed to load:', error)}
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
