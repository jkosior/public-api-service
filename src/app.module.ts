import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicApiConnectorModule } from './public-api-connector/public-api-connector.module';
import { CronModule } from './cron/cron.module';
import { resolve } from 'path';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { ConfigNames } from './config/config-names.enum';

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
    PublicApiConnectorModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
