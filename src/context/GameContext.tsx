import Player, { Char } from "@/classes/Player";
import React from "react";

export const GameContext = React.createContext<ReturnType<typeof useDate>>(null as any);

export type BoardMatrixValueIndex = number;
export type BoardMatrixValue = Char | null;
export type BoardMatrix = BoardMatrixValue[][];
export interface TurnInfo {
    player: Player,
    startAt: number
}

type EndGameResult = null
    | { type: "win", winner: Player }
    | { type: "tie" }

function createBoardMatrix(size: number): BoardMatrix {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => null));
}

function useDate() {
    const [isGameStarted, setGameStarted] = React.useState(false);
    const [boardSize, setBoardSize] = React.useState(3);
    const [boardMatrix, setBoardMatrix] = React.useState(createBoardMatrix(boardSize));
    const [endGameResult, setEndGameResult] = React.useState<EndGameResult>(null);
    const [totalGames, setTotalGames] = React.useState(0);

    const players = React.useMemo<[Player, Player]>(() => [
        new Player({ name: "Player 1", char: "X" }),
        new Player({ name: "Player 2", char: "O" }),
    ], []);

    const [turnInfo, setTurnInfo] = React.useState<TurnInfo>({
        player: players[0],
        startAt: Date.now(),
    });

    function startNewGame() {
        setBoardMatrix(createBoardMatrix(boardSize));

        players[0].clearGameInfo();
        players[1].clearGameInfo();

        setEndGameResult(null);
        setGameStarted(true);
        setTurnInfo({ player: players[0], startAt: Date.now() });
    }


    function makeTurn(i: BoardMatrixValueIndex, j: BoardMatrixValueIndex, player: Player) {
        if (boardMatrix[i]![j] !== null) return;
        boardMatrix[i]![j] = player.char;
        setBoardMatrix([...boardMatrix]);

        player.gameTimeSpent += Date.now() - turnInfo.startAt;

        if (checkWin(boardMatrix)) {
            player.wins++;
            endGame({ type: "win", winner: player });
            return;
        }
        if (checkTie(boardMatrix)) {
            endGame({ type: "tie" });
            return;
        }

        setTurnInfo({
            player: player == players[0] ? players[1] : players[0],
            startAt: Date.now()
        });
    }

    function endGame(result: EndGameResult) {
        setGameStarted(false);
        setTimeout(() => {
            setEndGameResult(result);
            setTotalGames(t => ++t);
        }, 2000);
    }

    React.useEffect(() => {
        if (isGameStarted) return;

        setBoardMatrix(createBoardMatrix(boardSize));
    }, [boardSize]);

    return {
        isGameStarted, setGameStarted,
        boardSize, setBoardSize,
        boardMatrix, setBoardMatrix,
        players,
        endGameResult, setEndGameResult,
        turnInfo, setTurnInfo,
        totalGames,
        startNewGame, makeTurn,
    };
}

export function GameContextProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <GameContext.Provider value={useDate()}>{children}</GameContext.Provider>
    )
}




function checkWin(board: BoardMatrix): boolean {
    const size = board.length;

    // горизонталі
    if (board.some(row => row.every(e => e && e === row[0]))) return true;

    // вертикалі
    for (let col = 0; col < size; col++)
        if (board.every(row => row[col] && row[col] === board[0]![col])) return true;

    // головна діагональ
    if (board.every((row, i) => row[i] && row[i] === board[0]![0])) return true;

    // побічна діагональ
    if (board.every((row, i) => row[size - 1 - i] && row[size - 1 - i] === board[0]![size - 1])) return true;

    return false;
}

function checkTie(board: BoardMatrix): boolean {
    if (!boardIsFull(board)) return false;

    return !checkWin(board);
}

function boardIsFull(board: BoardMatrix) {
    return board.every(row => row.every(cell => cell));
}
