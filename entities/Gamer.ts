import { Expose } from "class-transformer";

export class Gamer {
    constructor(id: string, photo_id: number){
        this.gamer_id = id;
//	      this.nickName = nickName;     
		this.photo_id = photo_id;        
    }

    @Expose()
    gamer_id: String;
    @Expose()    
    nickName : String;
    @Expose( {name: "date_of_birth"})
    dateOfBirth: String;
    @Expose()
    bio: String;
    @Expose()
    photo_id: number; 
}