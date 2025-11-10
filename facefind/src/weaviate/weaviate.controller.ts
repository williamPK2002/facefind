import { Controller, Get } from '@nestjs/common';
import { WeaviateService } from './weaviate.service';

@Controller('weaviate')
export class WeaviateController {
  constructor(private readonly weaviateService: WeaviateService) {}

  @Get('status')
  async checkConnection() {
    const client = this.weaviateService.getClient();
    const isReady = await client.isReady();
    return { connected: isReady };
  }
}
