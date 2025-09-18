import { Module } from '@nestjs/common';
import { ExtensionsModule } from './api/extensions/extensions.module';

@Module({
  imports: [ExtensionsModule]
})
export class AppModule {}
