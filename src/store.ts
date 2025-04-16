interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}

export class GameManager {
    games: Game[] = [];
    private static instance: GameManager;

    // constructor() {
    //     this.games = [];
    // }

    private constructor() {
        this.games = [];
    }

    static getInstance() {
        if(this.instance) {
            return this.instance;
        } else {
            this.instance = new GameManager();
            return this.instance
        }
    }

    addMove(gameId: string, move: string) {
        console.log(`Adding move ${move} to game ${gameId}`)
        const game = this.games.find(game => game.id === gameId);
        game?.moves.push(move)
    }

    addGame(gameId: string) {
        const game = {
            id: gameId,
            whitePlayerName: "Alice",
            blackPlayerName: "Denzel",
            moves: []
        }

        this.games.push(game);
    }

    log() {
        console.log("games: ", this.games)
    }
}