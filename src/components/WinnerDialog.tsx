import { GameContext } from "@/context/GameContext";
import React from "react";
import Modal from "./Modal";

export default function WinnerDialog() {
    const { endGameResult, setEndGameResult, players } = React.useContext(GameContext);

    function onClose() {
        setEndGameResult(null);
    }

    const text = endGameResult
        ? endGameResult.type == "tie"
            ? `It's a tie! The game lasted ${players.reduce((p, c) => p + c.gameTimeSpent / 1000, 0).toFixed(2)} seconds!`
            : `${endGameResult.winner.name} wins! Congratulations!`
        : null

    return (
        <Modal
            open={endGameResult !== null}
            onClose={onClose}
        >
            <div className="dialog stack column gap-2">
                <p>{text}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </Modal>
    )
}