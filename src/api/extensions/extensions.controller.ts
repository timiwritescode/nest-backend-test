import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExtensionDTO } from './dtos/create-extension.dto';
import { SuccessResponseDTO } from 'src/shared/dtos/success-response.dto';
import { ExtensionDTO } from './dtos/extension.dto';
import { ParseFormDataJsonPipe } from 'src/core/pipes/form-fields-transfomer.pipe';
import { ImageValidationPipe } from 'src/core/pipes/image-validation.pipe';

@Controller('extensions')
export class ExtensionsController {
    constructor(
        private readonly extensionService: ExtensionsService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('avatar', {
        limits: {
            fileSize: 2 * 1024 * 1024,
            
        }
    }))
    async createExtension(
        @Body(
             new ParseFormDataJsonPipe({ except: ['avatar']}),
            new ValidationPipe({transform: true, whitelist: true})            
        )
        dto: CreateExtensionDTO,

        @UploadedFile(
            new ImageValidationPipe()
        )
        avatar: Express.Multer.File,

    ): Promise<SuccessResponseDTO<ExtensionDTO>> {
        return await this.extensionService.createExtension(dto, avatar);
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
