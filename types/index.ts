export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  currentPlayerId: string | null;
  currentInput: string;
  moveHistory: Move[];
}

export interface Move {
  playerId: string;
  scoreAdded: number;
  timestamp: number;
}

export interface GameContextType {
  gameState: GameState;
  initializeGame: (players: Player[]) => Promise<void>;
  loadSavedGame: () => Promise<boolean>;
  selectPlayer: (playerId: string) => void;
  addNumber: (num: string) => void;
  addScore: () => void;
  undoLastMove: () => void;
  clearInput: () => void;
}
