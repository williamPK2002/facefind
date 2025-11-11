import { IsString, IsOptional } from 'class-validator';

//- persons(id, university_id?, display_name, consent_flags, gallery_embed[])

export class CreatePersonDto {
    @IsOptional()
    @IsString()
    university_id?: string;

    @IsString()
    display_name: string;

    @IsOptional()
    @IsString()
    consent_flags?: string;

    gallery_embed: [];
}
