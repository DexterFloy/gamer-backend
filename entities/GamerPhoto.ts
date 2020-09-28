import {Expose} from 'class-transformer'

export class GamerPhoto {
    constructor(mimeType: String, photo: Buffer) {
        this.mimeType = mimeType;
        this.photo = photo;
    }

	@Expose()
	photo_id: number;
	@Expose()
	mimeType: String;
	@Expose()
	photo: Buffer;
}