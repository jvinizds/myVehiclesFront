import React from 'react'
import { StyleSheet, View } from 'react-native';
import Navigation from './src/stack/Navigation'

export default function App() {
  return (
    <View>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%'
  },
});
