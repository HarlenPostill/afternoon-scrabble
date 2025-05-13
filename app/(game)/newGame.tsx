import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame } from '@/context/GameContext';
// eslint-disable-next-line import/no-unresolved
import { Player } from '@/types';
import { router } from 'expo-router';
import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewGame = () => {
  const { initializeGame } = useGame();
  const [playerCount, setPlayerCount] = React.useState<number>(3);
  const [playerNames, setPlayerNames] = React.useState<string[]>(['', '', '', '']);

  const handleStartGame = async () => {
    const players: Player[] = playerNames.slice(0, playerCount).map((name, index) => ({
      id: `player${index + 1}`,
      name: name || `Player ${index + 1}`,
      score: 0,
    }));

    await initializeGame(players);
    router.replace('/(game)/activeGame');
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  return (
    <SafeAreaView style={styles.NewGame}>
      <View style={styles.gameConfig}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={20} color={'#000'} />
          </TouchableOpacity>
          <Text style={[styles.titile, styles.titileTypo]}>New Game</Text>
        </View>

        <View style={styles.playerCount}>
          <Text style={[styles.playerNumberTitle, styles.titileTypo]}>How Many Players?</Text>
          <View style={styles.countRadioButtons}>
            {[2, 3, 4].map(num => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.numberButton,
                  styles.buttonBorder,
                  playerCount === num && styles.numberButtonSelected,
                ]}
                onPress={() => setPlayerCount(num)}>
                <Text style={[styles.playerNumberTitle, styles.titileTypo]}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.playerCount}>
          <Text style={[styles.playerNumberTitle, styles.titileTypo]}>{"Who's Playing?"}</Text>
          {Array.from({ length: playerCount }).map((_, index) => (
            <TextInput
              key={index}
              style={styles.player1NameTextinput}
              placeholder={`Enter Player ${index + 1} Name`}
              value={playerNames[index]}
              onChangeText={text => updatePlayerName(index, text)}
              placeholderTextColor="#666"
            />
          ))}
        </View>
      </View>

      <TouchableOpacity style={[styles.button, styles.buttonBorder]} onPress={handleStartGame}>
        <Text style={[styles.playerNumberTitle, styles.titileTypo]}>Start Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titileTypo: {
    textAlign: 'left',
    color: '#000',
    fontFamily: 'SF Pro Display',
    textTransform: 'capitalize',
  },
  buttonBorder: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#dc7480',
    borderStyle: 'solid',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  titile: {
    fontSize: 30,
    fontWeight: '600',
  },
  playerNumberTitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  numberButton: {
    backgroundColor: '#f7b6c1',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    flex: 1,
  },
  numberButtonSelected: {
    backgroundColor: '#dc7480',
  },
  countRadioButtons: {
    gap: 8,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  playerCount: {
    gap: 16,
    alignSelf: 'stretch',
  },
  player1NameTextinput: {
    backgroundColor: '#feeef1',
    borderWidth: 2,
    padding: 16,
    borderColor: '#dc7480',
    borderStyle: 'solid',
    borderRadius: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    overflow: 'hidden',
    color: '#000',
    fontSize: 16,
  },
  gameConfig: {
    gap: 24,
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: '#f7b6c1',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    alignSelf: 'stretch',
  },
  NewGame: {
    backgroundColor: '#fff',
    width: '100%',
    height: 844,
    justifyContent: 'space-between',
    padding: 24,
    gap: 0,
    overflow: 'hidden',
    flex: 1,
  },
});

export default NewGame;
