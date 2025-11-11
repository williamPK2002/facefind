import { Injectable } from '@nestjs/common';
import { CreateAbuseReportDto } from './dto/create-abuse_report.dto';
import { UpdateAbuseReportDto } from './dto/update-abuse_report.dto';
import { WeaviateService } from 'src/weaviate/weaviate.service';

//- abuse_reports(id, reporter_id, face_id/photo_id, reason, status)
@Injectable()
export class AbuseReportsService {
  constructor(private readonly weaviateService: WeaviateService) {}
  create(createAbuseReportDto: CreateAbuseReportDto): Promise<string> {
    return this.weaviateService.createObject('abuse_reports', createAbuseReportDto);
  }

  findAll(): Promise<any[]> {
    return this.weaviateService.findAllObjects('abuse_reports');
  }

  findOne(id: number): Promise<any> {
    return this.weaviateService.getObject('abuse_reports', id.toString());
  }

  update(id: number, updateAbuseReportDto: UpdateAbuseReportDto) {
    return this.weaviateService.updateObject('abuse_reports', id.toString(), updateAbuseReportDto);
  }

  remove(id: number): Promise<any> {
    return this.weaviateService.deleteObject('abuse_reports', id.toString());
  }
}
