import { Injectable } from '@nestjs/common';
import { CreateAbuseReportDto } from './dto/create-abuse_report.dto';
import { UpdateAbuseReportDto } from './dto/update-abuse_report.dto';

@Injectable()
export class AbuseReportsService {
  create(createAbuseReportDto: CreateAbuseReportDto) {
    return 'This action adds a new abuseReport';
  }

  findAll() {
    return `This action returns all abuseReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abuseReport`;
  }

  update(id: number, updateAbuseReportDto: UpdateAbuseReportDto) {
    return `This action updates a #${id} abuseReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} abuseReport`;
  }
}
