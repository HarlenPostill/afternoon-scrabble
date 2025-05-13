import { useGame } from '@/context/GameContext';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewGame = () => {
  const { gameState, selectPlayer, addNumber, addScore, undoLastMove, clearInput } = useGame();

  const handlePlayerSelect = (playerId: string) => {
    selectPlayer(playerId);
  };

  const handleNumberPress = (num: string) => {
    if (gameState.currentPlayerId) {
      addNumber(num);
    }
  };

  const handleAddScore = () => {
    if (gameState.currentPlayerId && gameState.currentInput) {
      addScore();
    }
  };

  return (
    <SafeAreaView style={[styles.gameScreen, styles.gameScreenFlexBox]}>
      <View style={[styles.settingsAndInformation, styles.playerFramesFlexBox]}>
        <Text style={[styles.titile, styles.titileTypo]}>Afternoon Scrabble</Text>
        <View style={styles.settingsFrame}>
          <TouchableOpacity onPress={undoLastMove}>
            <Text style={styles.undoButton}>􀰛</Text>
          </TouchableOpacity>
          <Text style={[styles.settingsButton, styles.titileTypo]}>􀍟</Text>
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
        <View style={[styles.total, styles.totalFlexBox]}>
          <Text style={[styles.currentAddedValue, styles.playerTotalScoreTypo]}>
            {gameState.currentInput || '0'}
          </Text>
        </View>

        <View style={[styles.keyboard, styles.totalFlexBox]}>
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
            <TouchableOpacity style={[styles.addKey, styles.addKeyLayout]} onPress={handleAddScore}>
              <Text style={[styles.playerName, styles.titileTypo]}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.numberTile, styles.addKeyLayout]}
              onPress={() => handleNumberPress('0')}>
              <Text style={[styles.playerName, styles.titileTypo]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addKey, styles.addKeyLayout]} onPress={clearInput}>
              <Text style={[styles.text11, styles.titileTypo]}>􀆛</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerTotalScoreTypo: {
    fontWeight: '500',
    textAlign: 'left',
    color: '#000',
    fontFamily: 'SF Pro Display',
    textTransform: 'capitalize',
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
    borderRadius: 5,
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
    paddingVertical: 26,
    flexDirection: 'row',
    gap: 0,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  playerImageContainer: {
    borderRadius: 9999,
    backgroundColor: '#dc7480',
    width: 101,
    height: 101,
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
    gap: 22,
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  playerFrames: {
    paddingVertical: 0,
    gap: 12,
    flex: 1,
  },
  currentAddedValue: {
    fontSize: 60,
  },
  total: {
    flexDirection: 'row',
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
    borderColor: '#7b7d7f',
  },
  text11: {
    color: '#000',
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontSize: 22,
  },
  keyboard: {
    padding: 16,
    gap: 5,
    overflow: 'hidden',
  },
  bottomFrameKeyboardAndClue: {
    alignSelf: 'stretch',
  },
  gameScreen: {
    width: '100%',
    height: 844,
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NewGame;
