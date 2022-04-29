# online-2d-game-demo

An online 2D game demo using Colyseus + Phaser3, packed by Parcel.

Template comes from [here](https://github.com/ematta/phaser3-typescript-parcel-template), also the install and build configurations.

# Structure

## Custom types

Used for sharing types.

### `GameMessages.ts`

An enumerate type for recording the commands sent by player between server and clients.

Basically used for avoiding typo.

### `GameState.ts`

Classes for indicating all states of a game.

## Server side

### `index.ts`

Setting the server app and listen the port.

**This is a template**

**Further explanation needed**

### `states/GameRoomState.ts`

The actual definition of state of a room.

Use special wrapper provided by Colyseus for high performance transmission and serialization.

### `rooms/GameRoom.ts`

A room class for the game management.Current in charge of taking 


### `commands/PlayerSelectionCommand.ts`

The [doc for command pattern](https://docs.colyseus.io/colyseus/best-practices/overview/#the-command-pattern).

A dispatcher takes a command and corresponding payload, and abstract the game logic into the command classes,
instead of leaving the codes in the game room file.

`GameRoom` listens for a `Message.playerSelection` message, and dispatch the `PlayerSelectionCommand`, with
payload being the player `client.id` and selected cell `index`, both received from client message.

This command searches for the index of client id and update the state of the board, then call the check command.

### `commands/CheckWinCommand.ts`

Check the board state, broadcast the board state and update the room state.

### `commands/NextTurnCommand.ts`

Update the index of active player.

## Client side

### `index.html`

The main page.

### `main.ts`

The main script. Configure the overall Phaser3 option.

### `ServerSocket.ts`

For communicating with server.

### `BoorstrapScene.ts`

Initial scene.

### `GameScene.ts`

Hold the game states and logic.

