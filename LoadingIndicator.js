// LoadingIndicator.js
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingIndicator = ({isLoading}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" /> // You can customize
      the color and size
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Makes the loading indicator overlay on top of the content
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
  },
});

export default LoadingIndicator;
