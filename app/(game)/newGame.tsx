import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function NewGame() {
  return (
    <SafeAreaView>
      <Text>New Game</Text>
      <TouchableOpacity>
        <Text>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Resume Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
