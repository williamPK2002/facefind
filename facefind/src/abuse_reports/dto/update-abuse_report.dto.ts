import { PartialType } from '@nestjs/mapped-types';
import { CreateAbuseReportDto } from './create-abuse_report.dto';

export class UpdateAbuseReportDto extends PartialType(CreateAbuseReportDto) {}
