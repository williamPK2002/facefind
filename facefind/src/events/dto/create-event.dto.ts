import { IsString, IsNotEmpty, IsDate } from 'class-validator';
//- events(id, name, time_start, time_end, privacy_mode, opt_in_required, owner_id)

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsDate()
    time_start: string;

    @IsNotEmpty()
    @IsString()
    @IsDate()
    time_end: string;

    @IsNotEmpty()
    @IsString()
    privacy_mode: string;

    @IsNotEmpty()
    @IsString()
    opt_in_required: string;

    @IsNotEmpty()
    @IsString()
    owner_id: string;
}
