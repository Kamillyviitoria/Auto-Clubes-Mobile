import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/autoclubes.png')}
      style={styles.background}
      resizeMode= "contain" 
    >
          </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor:'#100f0f',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(34,34,34,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

export default HomeScreen; 