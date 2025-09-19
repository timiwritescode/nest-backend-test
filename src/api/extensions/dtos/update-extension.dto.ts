import { ApiProperty } from "@nestjs/swagger";
import { ExtensionStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateExtensionDTO {
    @IsOptional()
    @IsString()
    @ApiProperty({required: false})
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({required: false})
    description?: string;

    @IsOptional()
    @IsEnum(ExtensionStatus)
    @ApiProperty({required: false})
    status?: ExtensionStatus;

    @ApiProperty({required: false, type: 'string', format: 'binary'})
    avatarImage?: Express.Multer.File
}