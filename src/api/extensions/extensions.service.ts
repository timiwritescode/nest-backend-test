import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateExtensionDTO } from './dtos/create-extension.dto';
import { SuccessResponseDTO } from 'src/shared/dtos/success-response.dto';
import { ExtensionDTO } from './dtos/extension.dto';
import { EXTENSION_CREATED } from './success-messages';
import { AwsService } from 'src/shared/services/aws.service';
import { generateFileHash } from 'src/shared/utils/util';

@Injectable()
export class ExtensionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly awsService: AwsService) {}

    async createExtension(dto: CreateExtensionDTO, image?: Express.Multer.File): Promise<SuccessResponseDTO<ExtensionDTO>> {
        let imageURL: string;
        if (image) {
            imageURL = await this.uploadImageToAws(image)
        }
        const newExtension = await this.prisma.extension.create({
            data: {
                
                name: dto.extensionName,
                description: dto.description,
                status: dto.status,
                avatarURL: imageURL
                
            }
        });



        return new SuccessResponseDTO(EXTENSION_CREATED, HttpStatus.CREATED,new ExtensionDTO(newExtension))
    }

    private async uploadImageToAws(image: Express.Multer.File): Promise<string> {
        const imageHash = generateFileHash(image.buffer);
        return await this.awsService.uploadSingleFile(image, imageHash)
    }

    async getExtensions(page = 1, pageSize=12) {

    }

    async getExtensionById(extensionId: string) {}

    async updateExtension(extensionId: string) {}

    async deleteExtension(extensionId: string) {
        
    }
}
