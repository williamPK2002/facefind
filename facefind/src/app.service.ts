import { Injectable } from '@nestjs/common';
import { WeaviateService } from './weaviate/weaviate.service';
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';
import { create } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly weaviateService: WeaviateService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testPost(message: string): Promise<string> {
    //createObject function accepts properties as an object
    const properties = { message };
    return this.weaviateService.createObject('TestClass', properties);
  }

  async testGet(id: string): Promise<string> {
    return this.weaviateService.getObject('TestClass', id);
  }

  async testEmbed(message: string, imgPath: string): Promise<string> {
  // safer relative path (no double facefind)
  const imagePath = `C:\\Users\\asus\\Desktop\\SeniorProject\\facefind\\testImg\\imgT_2.jpg`;
  //
  if (!fs.existsSync(imagePath)) {
    throw new Error(`❌ Image not found: ${imagePath}`);
  }

  // read file into buffer
  const buffer = fs.readFileSync(imagePath);

  // send to Python embedder
  const embedResult = await this.weaviateService.embedFace(buffer);

  // handle multiple faces safely
  if (!embedResult?.embeddings?.length) {
    throw new Error('❌ No embeddings returned from face-embedder');
  }

  const vector = (embedResult.embeddings[0]); // first detected face

  console.log(embedResult + " this is embed result\n" + typeof(vector) + " this is vector");

  const properties = { message };
  // save to Weaviate
  return await this.weaviateService.createObject('TestClass', properties, vector);
}

}
