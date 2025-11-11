import { IsString, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
//- faces(id, photo_id, bbox, quality, embed[vector], person_id?, match_score, labeled_by{auto|human})
export class CreateFaceDto {
    @IsNotEmpty()
    @IsString()
    photo_id: string;

    @IsNotEmpty()
    @IsString()
    bbox: string;

    @IsNotEmpty()
    @IsString()
    quality: string;

    @IsArray()
    embed: [];

    @IsString()
    person_id?: string;

    @IsString()
    match_score?: string;

    @IsString()
    @IsEnum(['auto', 'human'], { message: 'labeled_by must be either auto or human' })
    labeled_by?:'auto' | 'human';
}

