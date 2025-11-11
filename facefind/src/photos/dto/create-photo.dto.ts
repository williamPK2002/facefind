import { isString, IsString } from 'class-validator';
//- photos(id, event_id, url_original, url_web, taken_at, camera, exif_json, phash)

export class CreatePhotoDto {
    @IsString()
    event_id: string;

    @IsString()
    url_original: string;

    @IsString()
    url_web: string;

    @IsString()
    taken_at: string;

    @IsString()
    camera: string;

    @IsString()
    exif_json: string;

    @IsString()
    phash: string;
}
