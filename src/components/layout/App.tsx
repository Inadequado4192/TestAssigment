import Player from "@/classes/Player"
import PlayerPanel from "../PlayerPanel"
import GamePanel from "../GamePanel";
import { GameContext, GameContextProvider } from "@/context/GameContext";
import React from "react";


export default function App() {

    return (
        <div
            className="stack row center gap-3"
            style={{ height: "100%" }}
        >
            <GameContextProvider>
                <PlayerPanel playerIndex={0} />
                <GamePanel />
                <PlayerPanel playerIndex={1} />
            </GameContextProvider>
        </div>
    )
}
