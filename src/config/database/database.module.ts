import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';


@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService)=>({
                type:'mysql',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USERNAME'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_DATABASE'),
                entities: [StaffEntity],
                synchronize: false
            }),
            inject: [ConfigService],
        })
    ],
    exports:[TypeOrmModule]
})
export class DatabaseModule {
}
