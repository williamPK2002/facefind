import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbuseReportsService } from './abuse_reports.service';
import { CreateAbuseReportDto } from './dto/create-abuse_report.dto';
import { UpdateAbuseReportDto } from './dto/update-abuse_report.dto';

@Controller('abuse-reports')
export class AbuseReportsController {
  constructor(private readonly abuseReportsService: AbuseReportsService) {}

  @Post()
  create(@Body() createAbuseReportDto: CreateAbuseReportDto) {
    return this.abuseReportsService.create(createAbuseReportDto);
  }

  @Get()
  findAll() {
    return this.abuseReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abuseReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbuseReportDto: UpdateAbuseReportDto) {
    return this.abuseReportsService.update(+id, updateAbuseReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abuseReportsService.remove(+id);
  }
}
