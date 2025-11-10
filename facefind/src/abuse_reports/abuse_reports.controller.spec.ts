import { Test, TestingModule } from '@nestjs/testing';
import { AbuseReportsController } from './abuse_reports.controller';
import { AbuseReportsService } from './abuse_reports.service';

describe('AbuseReportsController', () => {
  let controller: AbuseReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbuseReportsController],
      providers: [AbuseReportsService],
    }).compile();

    controller = module.get<AbuseReportsController>(AbuseReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
