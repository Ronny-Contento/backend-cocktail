import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_NAME'),
        entities: [StaffEntity],
        synchronize: false,
        ssl: configService.get('POSTGRES_SSL') === 'true',
        extra: {
          ssl:
            configService.get('POSTGRES_SSL') === 'true'
              ? {
                  rejectUnauthorized: false,
                }
              : null,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
