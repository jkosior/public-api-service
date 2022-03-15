import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PublicApiConnectorModule } from './public-api-connector/public-api-connector.module';
import { CronModule } from './cron/cron.module';
import { resolve } from 'path';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { ConfigNames } from './config/config-names.enum';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.load(
      resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name) => name.replace('.config', ''),
        path: resolve(__dirname, '..', '.env'),
      },
    ),
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNames.logger),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNames.mongo),
      inject: [ConfigService],
    }),
    PublicApiConnectorModule,
    CronModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
