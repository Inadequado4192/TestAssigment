import { GameContext, BoardMatrixValue, BoardMatrixValueIndex } from "@/context/GameContext";
import React from "react";
import WinnerDialog from "./WinnerDialog";

export default function Board() {
    const { boardMatrix, totalGames } = React.useContext(GameContext);

    return (
        <>
            <span>Total Games: {totalGames}</span>
            <div id="board" className="stack column">
                {boardMatrix.map((line, i) => (
                    <div key={i} className="line stack row">
                        {line.map((value, j) => <BoardCell key={j} pos={[i as BoardMatrixValueIndex, j as BoardMatrixValueIndex]} />)}
                    </div>
                ))}
            </div>
            <WinnerDialog />
        </>
    );
}
function BoardCell({ pos }: { pos: [BoardMatrixValueIndex, BoardMatrixValueIndex] }) {
    const { isGameStarted, turnInfo: turn, boardMatrix, makeTurn: setValueOnBoard } = React.useContext(GameContext);

    function onClick() {
        if (!isGameStarted) return;

        setValueOnBoard(pos[0], pos[1], turn.player);
    }

    const value = boardMatrix[pos[0]]![pos[1]];

    return (
        <div className="cell" onClick={onClick}>
            {value && (
                <svg viewBox="0 0 100 100">
                    <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="70"
                        style={{ fontFamily: "inherit", fontWeight: 500 }}
                    >
                        {value}
                    </text>
                </svg>
            )}
        </div>
    )
}