import { Module } from '@nestjs/common';
import { AbuseReportsService } from './abuse_reports.service';
import { AbuseReportsController } from './abuse_reports.controller';

@Module({
  controllers: [AbuseReportsController],
  providers: [AbuseReportsService],
})
export class AbuseReportsModule {}
