import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame } from '@/context/GameContext';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fourLetterWords from '../assets/dictionary.json';

const NewGame = () => {
  const { gameState, selectPlayer, addNumber, addScore, undoLastMove, clearInput } = useGame();

  const [awake, setAwake] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState<'numbers' | 'qwerty'>('numbers');
  const [wordValidationStatus, setWordValidationStatus] = useState<'none' | 'valid' | 'invalid'>(
    'none'
  );

  const handlePlayerSelect = (playerId: string) => {
    selectPlayer(playerId);
  };

  const handleNumberPress = (num: string) => {
    if (gameState.currentPlayerId) {
      addNumber(num);
    }
  };

  const handleLetterPress = (letter: string) => {
    if (gameState.currentPlayerId) {
      addNumber(letter);
    }
  };

  const toggleKeepAwake = () => {
    setAwake(!awake);
    if (awake) {
      deactivateKeepAwake();
      console.log('Deactivated keep awake');
    } else {
      activateKeepAwakeAsync();
      console.log('activated keep awake');
    }
  };

  const handleAddScore = () => {
    if (gameState.currentPlayerId && gameState.currentInput) {
      if (keyboardMode === 'numbers') {
        addScore();
      } else {
        // Check if word is valid
        const enteredWord = gameState.currentInput.toLowerCase();
        const isValidWord = fourLetterWords.includes(enteredWord);

        setWordValidationStatus(isValidWord ? 'valid' : 'invalid');

        // Reset validation status after 2 seconds
        setTimeout(() => {
          setWordValidationStatus('none');
          if (isValidWord) {
            addScore();
          }
        }, 2000);
      }
    }
  };

  const toggleKeyboardMode = () => {
    // Clear the current input when switching keyboard modes
    clearInput();
    setKeyboardMode(keyboardMode === 'numbers' ? 'qwerty' : 'numbers');
  };

  // The text color for the current input based on word validation status
  const getInputTextColor = () => {
    if (wordValidationStatus === 'valid') return '#4CAF50'; // Green
    if (wordValidationStatus === 'invalid') return '#F44336'; // Red
    return '#000'; // Default black
  };

  const renderNumberKeyboard = () => {
    return (
      <>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
        ].map((row, i) => (
          <View key={i} style={[styles.topKeyboardRow, styles.playerFrameFlexBox]}>
            {row.map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.numberTile, styles.addKeyLayout]}
                onPress={() => handleNumberPress(num)}>
                <Text style={[styles.playerName, styles.titileTypo]}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={[styles.topKeyboardRow, styles.playerFrameFlexBox]}>
          <TouchableOpacity
            style={[styles.addKey, styles.addKeyLayout]}
            onPress={toggleKeyboardMode}>
            <Text style={[styles.playerName, styles.titileTypo]}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.numberTile, styles.addKeyLayout]}
            onPress={() => handleNumberPress('0')}>
            <Text style={[styles.playerName, styles.titileTypo]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addKey, styles.addKeyLayout]} onPress={clearInput}>
            <IconSymbol name="delete.left" color={'#000'} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderQwertyKeyboard = () => {
    const keyboardRows = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ];

    return (
      <>
        {keyboardRows.map((row, rowIndex) => (
          <View key={rowIndex} style={[styles.topKeyboardRow, styles.playerFrameFlexBox]}>
            {rowIndex === 2 && (
              <TouchableOpacity
                style={[styles.addKey, styles.addKeyLayout]}
                onPress={toggleKeyboardMode}>
                <Text style={[styles.playerName, styles.titileTypo, { fontSize: 16 }]}>Add</Text>
              </TouchableOpacity>
            )}

            {row.map(letter => (
              <TouchableOpacity
                key={letter}
                style={[styles.numberTile, styles.addKeyLayout]}
                onPress={() => handleLetterPress(letter)}>
                <Text style={[styles.playerName, styles.titileTypo]}>{letter}</Text>
              </TouchableOpacity>
            ))}

            {rowIndex === 2 && (
              <TouchableOpacity style={[styles.addKey, styles.addKeyLayout]} onPress={clearInput}>
                <IconSymbol name="delete.left" color={'#000'} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.gameScreen, styles.gameScreenFlexBox]}>
      <View style={[styles.settingsAndInformation, styles.playerFramesFlexBox]}>
        <Text style={[styles.titile, styles.titileTypo]}>Afternoon Scrabble</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}
          onPress={toggleKeepAwake}>
          {awake ? (
            <IconSymbol name={'cup.and.saucer.fill'} size={30} color={'#dc7480'} />
          ) : (
            <IconSymbol name={'cup.and.saucer'} size={30} color={'#dc7480'} />
          )}
        </TouchableOpacity>

        <View style={styles.settingsFrame}>
          <TouchableOpacity
            style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}
            onPress={undoLastMove}>
            <IconSymbol name={'arrowshape.turn.up.backward.fill'} color={'#dc7480'} />
            <Text style={{ fontSize: 18, color: '#DC747F', fontWeight: 500 }}>Undo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.playerFrames, styles.playerFramesFlexBox]}>
        <View style={styles.topPlayerFrame}>
          {gameState.players.slice(0, 2).map(player => (
            <TouchableOpacity
              key={player.id}
              style={[
                styles.playerFrameBase,
                gameState.currentPlayerId === player.id
                  ? styles.activePlayerFrame
                  : styles.innactivePlayerFrame,
              ]}
              onPress={() => handlePlayerSelect(player.id)}>
              <View style={styles.playerImageContainer} />
              <Text style={[styles.playerName, styles.titileTypo]}>{player.name}</Text>
              <Text style={[styles.playerTotalScore, styles.playerTotalScoreTypo]}>
                {player.score}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {gameState.players.length > 2 && (
          <View style={styles.topPlayerFrame}>
            {gameState.players.slice(2).map(player => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.playerFrameBase,
                  gameState.currentPlayerId === player.id
                    ? styles.activePlayerFrame
                    : styles.innactivePlayerFrame,
                ]}
                onPress={() => handlePlayerSelect(player.id)}>
                <View style={styles.playerImageContainer} />
                <Text style={[styles.playerName, styles.titileTypo]}>{player.name}</Text>
                <Text style={[styles.playerTotalScore, styles.playerTotalScoreTypo]}>
                  {player.score}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.bottomFrameKeyboardAndClue}>
        <View
          style={[
            styles.total,
            styles.totalFlexBox,
            {
              height: 122,
              paddingHorizontal: 8,
              gap: 2,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              styles.currentAddedValue,
              styles.playerTotalScoreTypo,
              { color: getInputTextColor() },
            ]}>
            {gameState.currentInput || '0'}
          </Text>
          <TouchableOpacity
            style={[styles.largeAddKey, styles.addKeyLayout]}
            onPress={handleAddScore}>
            <Text style={[styles.playerName, styles.titileTypo]}>
              {keyboardMode === 'numbers' ? '+' : 'Check Word'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.keyboard, styles.totalFlexBox]}>
          {keyboardMode === 'numbers' ? renderNumberKeyboard() : renderQwertyKeyboard()}
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: '#DCDCDC',
          height: keyboardMode === 'numbers' ? 30 : 85,
          width: 500,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gameScreenFlexBox: {
    gap: 0,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  playerFramesFlexBox: {
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  titileTypo: {
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontSize: 22,
  },
  playerFrameFlexBox: {
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  playerFrameBase: {
    padding: 14,
    borderRadius: 20,
    gap: 6,
    flex: 1,
    maxWidth: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerTotalScoreTypo: {
    fontWeight: '500',
    textAlign: 'left',

    color: '#000',
    fontFamily: 'SF Pro Display',
    textTransform: 'uppercase',
  },
  totalFlexBox: {
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  addKeyLayout: {
    height: 50,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
  },
  titile: {
    fontWeight: '600',
    color: '#000',
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontSize: 22,
    textTransform: 'capitalize',
  },
  undoButton: {
    fontSize: 24,
    fontFamily: 'SF Pro',
    textAlign: 'center',
    color: '#dc7480',
  },
  settingsButton: {
    fontWeight: '700',
    color: '#dc7480',
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontSize: 22,
  },
  settingsFrame: {
    justifyContent: 'flex-end',
    gap: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsAndInformation: {
    paddingTop: 26,
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  playerImageContainer: {
    borderRadius: 99,
    backgroundColor: '#dc7480',
    width: 75,
    height: 75,
    overflow: 'hidden',
  },
  playerName: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontSize: 22,
    textTransform: 'capitalize',
  },
  playerTotalScore: {
    fontSize: 26,
  },
  activePlayerFrame: {
    backgroundColor: '#f7b6c1',
  },
  innactivePlayerFrame: {
    backgroundColor: 'transparent',
  },
  topPlayerFrame: {
    gap: 6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  playerFrames: {
    paddingVertical: 6,
    gap: 6,
    alignItems: 'stretch',
  },
  currentAddedValue: {
    fontSize: 60,
  },
  total: {
    flexDirection: 'column',
  },
  numberTile: {
    borderColor: '#888b8f',
    backgroundColor: '#fff',
  },
  topKeyboardRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  addKey: {
    backgroundColor: '#babdc1',
    width: '100%',
    borderColor: '#7B7D7F',
  },
  largeAddKey: {
    backgroundColor: '#90A9EA',
    width: '100%',
    borderColor: '#7387BB',
  },
  keyboard: {
    padding: 8,
    gap: 5,
    overflow: 'hidden',
  },
  bottomFrameKeyboardAndClue: {
    alignSelf: 'stretch',
    height: 349,
  },
  gameScreen: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NewGame;
