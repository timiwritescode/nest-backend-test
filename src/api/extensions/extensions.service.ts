import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExtensionDTO } from './dtos/create-extension.dto';
import { SuccessResponseDTO } from 'src/shared/success-response.dto';
import { ExtensionDTO } from './dtos/extension.dto';
import { EXTENSION_CREATED } from './success-messages';

@Injectable()
export class ExtensionsService {
    constructor(private prisma: PrismaService) {}

    async createExtension(dto: CreateExtensionDTO): Promise<SuccessResponseDTO<ExtensionDTO>> {
        // TODO: add file service to upload file

        const newExtension = await this.prisma.extension.create({
            data: {
                name: dto.extensionName,
                description: dto.description,
                status: dto.status

            }
        });



        return new SuccessResponseDTO(EXTENSION_CREATED, HttpStatus.CREATED,new ExtensionDTO(newExtension))
    }


    async getExtensions() {}

    async getExtensionById(extensionId: string) {}

    async updateExtension(extensionId: string) {}

    async deleteExtension(extensionId: string) {
        
    }
}
