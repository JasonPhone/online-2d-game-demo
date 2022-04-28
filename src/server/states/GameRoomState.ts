/**
 * schema
 */
import {Schema, type, ArraySchema} from "@colyseus/schema";
import { Cell, GameState } from "customtypes/GameState";
export class GameRoomState extends Schema implements GameState {
    @type("number") activePlayer: number = 0;
    @type(["number"]) board: ArraySchema<number>;
    @type("number") winPlayer: number = -1;
    constructor() {
        super();
        this.board= new ArraySchema(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        );
    }
}
