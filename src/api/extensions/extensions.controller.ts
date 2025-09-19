import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExtensionDTO } from './dtos/create-extension.dto';
import { SuccessResponseDTO } from 'src/shared/dtos/success-response.dto';
import { ExtensionDTO } from './dtos/extension.dto';

@Controller('extensions')
export class ExtensionsController {
    constructor(
        private readonly extensionService: ExtensionsService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('avatar'))
    async createExtension(
        @UploadedFile()
        avatar: Express.Multer.File,

        @Body()
        dto: CreateExtensionDTO
    ): Promise<SuccessResponseDTO<ExtensionDTO>> {
        return await this.extensionService.createExtension(dto);
    }

    @Get()
    async getAllExtensions(
        @Query('status') status: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number
        
    ) {
        
    }

    @Get(":extensionId")
    async getExtensionById(
        @Param('extensionId') extensionId: string
    ) {

    }

    @Patch(":extensionId")
    async editExtension(
        @Param('extensionId') extensionId: string
    ) {}

    @Delete(":extensionId")
    async deleteExtension(
        @Param('extensionId') extensionId: string
    ) {}
}
