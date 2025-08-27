import Board from "./Board";
import GameActions from "./GameActions";

export default function GamePanel() {
    return (
        <div className="stack column center gap-1">
            <Board />
            <GameActions />
        </div>
    )
}

