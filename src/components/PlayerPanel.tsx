import { GameContext } from "@/context/GameContext";
import React from "react";

export default function PlayerPanel({ playerIndex }: { playerIndex: 0 | 1 }) {
    const { players, isGameStarted, turnInfo: turn } = React.useContext(GameContext);

    const player = players[playerIndex];

    const isMyTurn = isGameStarted && turn.player == player

    return (
        <div
            className="stack column gap-1"
            style={{
                opacity: isMyTurn ? 1 : .25
            }}
        >
            <h2>{player.name}</h2>
            <span>Char: {player.char}</span>
            <span>Time: {(player.gameTimeSpent / 1000).toFixed(2)} sec.</span>
            <span>Wins: {player.wins}</span>
            {isMyTurn && <p>Your Turn!</p>}
        </div>
    )
}