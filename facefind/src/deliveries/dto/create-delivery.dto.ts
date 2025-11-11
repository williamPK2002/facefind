import { IsString, IsNotEmpty, IsEnum, IsDate } from 'class-validator';
//- deliveries(id, person_id, event_id, link_token, sent_via{email/line}, sent_at, open_at, click_at)

export class CreateDeliveryDto {
    @IsNotEmpty()
    @IsString()
    person_id: string;

    @IsNotEmpty()
    @IsString()
    event_id: string;

    @IsNotEmpty()
    @IsString()
    link_token: string;

    @IsNotEmpty()
    @IsEnum(["email", "line"], {message: 'Invalid sent_via value'})
    sent_via: "email" | "line";

    @IsDate()
    sent_at: Date;

    @IsDate()
    open_at: Date;

    @IsDate()
    click_at: Date;
}
