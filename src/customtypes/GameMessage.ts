/**
 * colyseus server code and phaser front-end 
 * could be in separated network servers,
 * so they don't share codes,
 * but we can still make a shared type
 * for better type inferring
 */
/**
 * to store messages
 */
export enum Message {
    playerSelection,
}
