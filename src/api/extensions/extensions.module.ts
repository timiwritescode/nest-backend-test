import { Module } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ExtensionsService, PrismaService],
  controllers: [ExtensionsController]
})
export class ExtensionsModule {}
