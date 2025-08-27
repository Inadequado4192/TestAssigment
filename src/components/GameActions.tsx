import { GameContext } from "@/context/GameContext";
import React from "react";

export default function GameActions() {
    const { startNewGame: srartNewGame, boardSize, setBoardSize } = React.useContext(GameContext);

    return (
        <div className="stack column gap-1">
            <button onClick={srartNewGame}>New Game</button>
            <select
                value={boardSize}
                onChange={e => setBoardSize(Number(e.target.value))}
            >
                {[3, 4, 5, 6, 7, 8, 9].map(size => <option key={size} value={size}>{size}x{size}</option>)}
            </select>
        </div>
    );
}