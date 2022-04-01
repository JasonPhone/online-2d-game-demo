/**
 * schema
 */
import {Schema, type} from "@colyseus/schema";

export class GameRoomState extends Schema {
    @type("string") currentTurn: string = "0";
    @type("string") currentBoard: string = "000000000";
}
