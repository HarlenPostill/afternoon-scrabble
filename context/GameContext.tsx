// eslint-disable-next-line import/no-unresolved
import { GameContextType, GameState, Move, Player } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useReducer } from 'react';

const STORAGE_KEY = '@afternoon_scrabble_game';

type GameAction =
  | { type: 'INITIALIZE_GAME'; players: Player[] }
  | { type: 'SELECT_PLAYER'; playerId: string }
  | { type: 'ADD_NUMBER'; number: string }
  | { type: 'ADD_SCORE' }
  | { type: 'UNDO_MOVE' }
  | { type: 'CLEAR_INPUT' }
  | { type: 'LOAD_GAME'; state: GameState };

const initialState: GameState = {
  players: [],
  currentPlayerId: null,
  currentInput: '',
  moveHistory: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...initialState,
        players: action.players,
      };

    case 'SELECT_PLAYER':
      return {
        ...state,
        currentPlayerId: action.playerId,
        currentInput: '',
      };

    case 'ADD_NUMBER':
      return {
        ...state,
        currentInput: state.currentInput + action.number,
      };

    case 'ADD_SCORE': {
      if (!state.currentPlayerId || !state.currentInput) return state;

      const score = parseInt(state.currentInput);
      if (isNaN(score)) return state;

      const newMove: Move = {
        playerId: state.currentPlayerId,
        scoreAdded: score,
        timestamp: Date.now(),
      };

      return {
        ...state,
        players: state.players.map(player =>
          player.id === state.currentPlayerId ? { ...player, score: player.score + score } : player
        ),
        currentInput: '',
        moveHistory: [...state.moveHistory, newMove],
      };
    }

    case 'UNDO_MOVE': {
      const lastMove = state.moveHistory[state.moveHistory.length - 1];
      if (!lastMove) return state;

      return {
        ...state,
        players: state.players.map(player =>
          player.id === lastMove.playerId
            ? { ...player, score: player.score - lastMove.scoreAdded }
            : player
        ),
        moveHistory: state.moveHistory.slice(0, -1),
        currentInput: '',
      };
    }

    case 'CLEAR_INPUT':
      return {
        ...state,
        currentInput: '',
      };

    case 'LOAD_GAME':
      return action.state;

    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const saveGame = useCallback(async (state: GameState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game:', error);
    }
  }, []);

  const initializeGame = useCallback(
    async (players: Player[]) => {
      dispatch({ type: 'INITIALIZE_GAME', players });
      await saveGame({ ...initialState, players });
    },
    [saveGame]
  );

  const loadSavedGame = useCallback(async () => {
    try {
      const savedGame = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedGame) {
        const gameState = JSON.parse(savedGame) as GameState;
        dispatch({ type: 'LOAD_GAME', state: gameState });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading game:', error);
      return false;
    }
  }, []);

  const selectPlayer = useCallback((playerId: string) => {
    dispatch({ type: 'SELECT_PLAYER', playerId });
  }, []);

  const addNumber = useCallback((num: string) => {
    dispatch({ type: 'ADD_NUMBER', number: num });
  }, []);

  const addScore = useCallback(async () => {
    dispatch({ type: 'ADD_SCORE' });
    await saveGame(gameState);
  }, [gameState, saveGame]);

  const undoLastMove = useCallback(async () => {
    dispatch({ type: 'UNDO_MOVE' });
    await saveGame(gameState);
  }, [gameState, saveGame]);

  const clearInput = useCallback(() => {
    dispatch({ type: 'CLEAR_INPUT' });
  }, []);

  const value: GameContextType = {
    gameState,
    initializeGame,
    loadSavedGame,
    selectPlayer,
    addNumber,
    addScore,
    undoLastMove,
    clearInput,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
