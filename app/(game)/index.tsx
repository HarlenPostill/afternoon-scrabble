import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function IntroScreen() {
  return (
    <SafeAreaView>
      <Text>Afternoon Scrabble</Text>
      <TouchableOpacity
        onPress={() => {
          router.push('/(game)/newGame');
        }}>
        <Text>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.replace('/(game)/activeGame');
        }}>
        <Text>Resume Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
