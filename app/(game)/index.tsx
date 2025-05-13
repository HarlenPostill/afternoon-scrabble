import { useGame } from '@/context/GameContext';
import { router } from 'expo-router';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const IntroScreen = () => {
  const { loadSavedGame } = useGame();

  const handleResumeGame = async () => {
    const hasGame = await loadSavedGame();
    if (hasGame) {
      router.push('/(game)/activeGame');
    }
  };

  return (
    <SafeAreaView style={[styles.introScreen, styles.buttonFlexBox]}>
      <Text style={[styles.title, styles.titleTypo]}>Afternoon Scrabble</Text>

      <TouchableOpacity
        style={[styles.button, styles.buttonFlexBox]}
        onPress={() => router.push('/(game)/newGame')}>
        <Text style={[styles.newGame, styles.titleTypo]}>New game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonFlexBox]} onPress={handleResumeGame}>
        <Text style={[styles.newGame, styles.titleTypo]}>Resume Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleTypo: {
    textAlign: 'left',
    color: '#000',
    fontFamily: 'SF Pro Display',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  newGame: {
    fontSize: 22,
    fontWeight: '500',
  },
  button: {
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: '#f7b6c1',
    borderStyle: 'solid',
    borderColor: '#dc7480',
    borderBottomWidth: 2,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  introScreen: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: 844,
    paddingHorizontal: 24,
    paddingVertical: 0,
    gap: 16,
  },
});

export default IntroScreen;
