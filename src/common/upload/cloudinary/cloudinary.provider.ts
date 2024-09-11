import { v2 as cloudinary } from 'cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  imports: [ConfigModule],
  useFactory: (configService:ConfigService) => {
    // Configuration
    return cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
  },
  inject: [ConfigService],

};
