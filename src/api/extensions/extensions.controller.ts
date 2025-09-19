import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExtensionDTO } from './dtos/create-extension.dto';
import { SuccessResponseDTO } from 'src/shared/dtos/success-response.dto';
import { ExtensionDTO } from './dtos/extension.dto';
import { ParseFormDataJsonPipe } from 'src/core/pipes/form-fields-transfomer.pipe';
import { ImageValidationPipe } from 'src/core/pipes/image-validation.pipe';
import { UpdateExtensionDTO } from './dtos/update-extension.dto';
import { imageConfig } from './image-config';

@Controller('extensions')
export class ExtensionsController {
    constructor(
        private readonly extensionService: ExtensionsService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('avatar', {
        limits: {
            fileSize: imageConfig.maxSize,
            
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
        page = page ? +page : 1,
        pageSize = pageSize ? +pageSize : 12;
        return await this.extensionService.getExtensions(page, pageSize, status)
        
    }

    @Get(":extensionId")
    async getExtensionById(
        @Param('extensionId') extensionId: string
    ): Promise<SuccessResponseDTO<ExtensionDTO>> {
        return await this.extensionService.getExtensionById(extensionId);
    }

    @Patch(":extensionId")
    @UseInterceptors(FileInterceptor('avatarImage', {
        limits: {fileSize: imageConfig.maxSize}
    }))
    async editExtension(
        @Param('extensionId') extensionId: string,
        
        @Body(
             new ParseFormDataJsonPipe({ except: ['avatarImage']}),
            new ValidationPipe({transform: true, whitelist: true})            
        )
        dto: UpdateExtensionDTO,

        @UploadedFile(
            new ImageValidationPipe()
        )
        avatar: Express.Multer.File
        
    ): Promise<SuccessResponseDTO<ExtensionDTO>> {
        return await this.extensionService.updateExtension(extensionId, dto, avatar)
    } 

    @Delete(":extensionId")
    @HttpCode(HttpStatus.OK)
    async deleteExtension(
        @Param('extensionId') extensionId: string
    ): Promise<SuccessResponseDTO<void>> {
        return await this.extensionService.deleteExtension(extensionId)
    }
}
