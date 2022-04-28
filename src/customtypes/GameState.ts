/**
 * colyseus server code and phaser front-end 
 * could be in separated network servers,
 * so they don't share codes,
 * but we can still make a shared type
 * for better type inferring
 */
/**
 * to record the game state, for better type inferring
 * @member board board status, 0 for null, 1 for 'O', 2 for 'X'
 * @member activePlayer index of the active player
 */
export interface GameState {
    board: Cell[];
    activePlayer: number;
    winPlayer: number | undefined;
}
export enum Cell {
    Empty,
    X,
    O
}
