import { Gamer } from "../../entities/Gamer";

export interface IDatabaseAccessLayer {
    getGamer(gamer_id:String) : Promise<Gamer>;
}