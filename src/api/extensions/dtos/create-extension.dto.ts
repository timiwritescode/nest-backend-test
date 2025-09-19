import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ExtensionStatus } from "../extension-status";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExtensionDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsEnum(ExtensionStatus)
    @ApiProperty({required: false})
    status?: ExtensionStatus;

    @ApiProperty({type: 'string', format: 'binary', required: false})
    avatar?: Express.Multer.File
}