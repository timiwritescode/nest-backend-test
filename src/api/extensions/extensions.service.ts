import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateExtensionDTO } from './dtos/create-extension.dto';
import { SuccessResponseDTO } from 'src/shared/dtos/success-response.dto';
import { ExtensionDTO, MultipleExtensionsDTO } from './dtos/extension.dto';
import { EXTENSION_CREATED, EXTENSION_RETRIEVED, EXTENSION_UPDATED, EXTENSIONS_RETRIEVED_AND_PAGINATED } from './success-messages';
import { AwsService } from 'src/shared/services/aws.service';
import { generateFileHash } from 'src/shared/utils/util';
import { UpdateExtensionDTO } from './dtos/update-extension.dto';
import { Prisma } from '@prisma/client';
import { ERROR_EXTENSION_NOT_FOUND_MESSAGE } from './error-messages';

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
                
                name: dto.name,
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

    async getExtensions(page = 1, pageSize=12, status=''): Promise<SuccessResponseDTO<MultipleExtensionsDTO>> {
        const skip = (page - 1) * pageSize;
        
        const extensions = await this.prisma.extension.findMany({
            skip,
            take: pageSize,
            orderBy: {
                createdAt: 'desc'
            },
            where: status ? { status: { equals: status as any } } : undefined, 
        })


        return new SuccessResponseDTO(
            EXTENSIONS_RETRIEVED_AND_PAGINATED,
            HttpStatus.OK,
            new MultipleExtensionsDTO(extensions)
        )
    }

    async getExtensionById(extensionId: string): Promise<SuccessResponseDTO<ExtensionDTO>> {
        const extension = await this.prisma.extension.findUnique({
            where: {id: extensionId}
        });
        if (!extension) {
            throw new BadRequestException(ERROR_EXTENSION_NOT_FOUND_MESSAGE)
        }
        return new SuccessResponseDTO(
            EXTENSION_RETRIEVED,
            HttpStatus.OK,
            new ExtensionDTO(extension)
        )
    }

    async updateExtension(
    extensionId: string, 
    dto: UpdateExtensionDTO, 
    avatar?: Express.Multer.File
    ) {
        try {
            if (avatar) {
            const imageURL = await this.uploadImageToAws(avatar);
            dto['avatarURL'] = imageURL;
            }

            const updatedExtension = await this.prisma.extension.update({
            where: { id: extensionId },
            data: dto,
            });

            return new SuccessResponseDTO(
            EXTENSION_UPDATED,
            HttpStatus.OK,
            new ExtensionDTO(updatedExtension),
            );
        } catch (error) {
            if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
            ) {
            throw new NotFoundException(ERROR_EXTENSION_NOT_FOUND_MESSAGE);
            };
            throw error; // all errors handled in global exception
        } 
    }

    async deleteExtension(extensionId: string) {
        
    }
}
