import {Expose} from 'class-transformer'

export class GamerResult {

	    constructor(gamer_id: number, game_id: number) {
        this.gamer_id = gamer_id;
        this.game_id = game_id;

		}

	
	@Expose()
	typeOfGame: String;
	@Expose()
	gamer_id: number;
	@Expose()
	game_id: number;
	@Expose()
	gameName: String;

}