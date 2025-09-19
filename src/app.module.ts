import { Module } from '@nestjs/common';
import { ExtensionsModule } from './api/extensions/extensions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ExtensionsModule]
})
export class AppModule {}
