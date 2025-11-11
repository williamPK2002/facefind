import { IsString, IsOptional } from 'class-validator';
//- abuse_reports(id, reporter_id, face_id/photo_id, reason, status)
export class CreateAbuseReportDto {
    @IsString()
    reporterId: string;

    @IsOptional()
    @IsString()
    faceId?: string;

    @IsOptional()
    @IsString()
    photoId?: string;

    @IsString()
    reason: string;
    
    @IsString()
    status: string;
}
