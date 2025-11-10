import { Test, TestingModule } from '@nestjs/testing';
import { AbuseReportsService } from './abuse_reports.service';

describe('AbuseReportsService', () => {
  let service: AbuseReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbuseReportsService],
    }).compile();

    service = module.get<AbuseReportsService>(AbuseReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
