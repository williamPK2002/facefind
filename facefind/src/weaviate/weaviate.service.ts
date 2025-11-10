import { Injectable, OnModuleInit } from '@nestjs/common';
import weaviate, { WeaviateClient } from 'weaviate-client';
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

@Injectable()
export class WeaviateService implements OnModuleInit {
  private client!: WeaviateClient;
  private readonly EMBEDDER_URL = "http://127.0.0.1:8000/embed";

  async onModuleInit() {
    const weaviateURL = process.env.WEAVIATE_URL as string;
    const weaviateApiKey = process.env.WEAVIATE_API_KEY as string;

    this.client = await weaviate.connectToWeaviateCloud(weaviateURL, {
      authCredentials: new weaviate.ApiKey(weaviateApiKey),
    });

    const ready = await this.client.isReady();
    console.log('🟢 Weaviate connected:', ready);
  }

  async embedFace(imageBuffer: Buffer): Promise<any> {
    const formData = new FormData();
    formData.append("file", imageBuffer, { filename: "image.jpg", contentType: "image/jpeg" });

    try {
      const response = await axios.post(this.EMBEDDER_URL, formData, {
        headers: formData.getHeaders(), // sets proper multipart/form-data boundary
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      // you’ll get { num_faces, embeddings: [[...], [...]] }
      return response.data;
    } catch (error: any) {
      console.error("❌ Error embedding face:", error?.response?.data || error.message);
      throw new Error("Failed to generate embedding");
    }
  }

  async createObject(className: string, properties: any, vec?: number[]): Promise<string> {
    switch (className) {
      case 'TestClass':
        properties = {
          message: properties.message
        };
        break;
      case 'events':
        properties = {
          id: properties.id,
          name: properties.name,
          time_start: properties.time_start,
          time_end: properties.time_end,
          privacy_mode: properties.privacy_mode,
          opt_in_required: properties.opt_in_required,
          owner_id: properties.owner_id
        };
        break;
      case 'photos':
        properties = {
          id: properties.id,
          event_id: properties.event_id,
          url_original: properties.url_original,
          url_web: properties.url_web,
          taken_at: properties.taken_at,
          camera: properties.camera,
          exif_json: properties.exif_json,
          phash: properties.phash
        };
        break;
      case 'faces':
        properties = {
          id: properties.id,
          photo_id: properties.photo_id,
          bbox: properties.bbox,
          quality: properties.quality,
          embed: properties.embed,
          person_id: properties.person_id,
          match_score: properties.match_score,
          labeled_by: properties.labeled_by
        };
        break;
      case 'persons':
        properties = {
          id: properties.id,
          university_id: properties.university_id,
          display_name: properties.display_name,
          consent_flags: properties.consent_flags,
          gallery_embed: properties.gallery_embed
        };
        break;
      case 'deliveries':
        properties = {
          id: properties.id,
          person_id: properties.person_id,
          event_id: properties.event_id,
          link_token: properties.link_token,
          sent_via: properties.sent_via,
          sent_at: properties.sent_at,
          open_at: properties.open_at,
          click_at: properties.click_at
        };
        break;
      case 'abuse_reports':
        properties = {
          id: properties.id,
          reporter_id: properties.reporter_id,
          face_id: properties.face_id,
          photo_id: properties.photo_id,
          reason: properties.reason,
          status: properties.status
        };
        break;
      default:
        throw new Error(`Unknown class name: ${className}`);
    }
    const group = this.client.collections.use(className);

    const obj = await group.data.insert({
      class: className,
      properties: properties,
      vectors: vec
    });
    return obj;
  }

  async getObject(className: string, id: string): Promise<any> {
    const group = this.client.collections.use(className);
    const object = await group.query.fetchObjectById(id, {includeVector: true});
    console.log(object?.properties);
    console.log(object?.vectors);
    return object;
  }

  getClient(): WeaviateClient {
    if (!this.client) throw new Error('Weaviate client not initialized yet');
    return this.client;
  }
}
