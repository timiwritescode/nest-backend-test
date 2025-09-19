import { Module } from '@nestjs/common';
import { ExtensionsModule } from './api/extensions/extensions.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ExtensionsModule],
    controllers: [AppController]
})
export class AppModule {}
