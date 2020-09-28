import {Expose} from 'class-transformer'

export class Game {
    constructor(game_id: number) {
        this.game_id = game_id;
//        this.best = best;
//        this.worst = worst;
    }

    @Expose()
    game_id: number;

    @Expose()
    best: number;

    @Expose()
    worst: number;
}