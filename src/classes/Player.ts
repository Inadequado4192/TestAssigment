
export type Char = "X" | "O"; 

interface IPlayer {
    name: string;
    char: Char;
    
    wins?: number;
    gameTime?: number;
}

export default class Player {
    public name: IPlayer["name"];
    public char: IPlayer["char"];
    
    public wins: IPlayer["wins"] & {};
    public gameTimeSpent: IPlayer["gameTime"] & {};


    public constructor(params: IPlayer) {
        this.name = params.name;
        this.char = params.char;
        this.wins = params.wins ?? 0;
        this.gameTimeSpent = params.gameTime ?? 0;
    }

    public clearGameInfo() {
        this.gameTimeSpent = 0;
    }
}