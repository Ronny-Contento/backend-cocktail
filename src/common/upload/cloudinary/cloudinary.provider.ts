import { v2 as cloudinary } from 'cloudinary';
import { ConfigModule, ConfigService } from '@nestjs/config';


export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  imports: [ConfigModule],
  useFactory: (configService:ConfigService) => {
    // Configuration
    return cloudinary.config({
      cloud_name: 'dcg6amnmc',
      api_key: '161651931986146',
      api_secret: '6ua7HAj9Itl6A--eA0p7folGpAw'
    });
  },
};
