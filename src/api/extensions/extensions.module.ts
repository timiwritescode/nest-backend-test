import { Module } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/shared/services/aws.service';

@Module({
  providers: [ExtensionsService, PrismaService, AwsService],
  controllers: [ExtensionsController]
})
export class ExtensionsModule {}
