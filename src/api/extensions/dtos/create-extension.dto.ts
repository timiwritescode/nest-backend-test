import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ExtensionStatus } from "../extension-status";

export class CreateExtensionDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(ExtensionStatus)
    status?: ExtensionStatus;

    avatar?: Express.Multer.File
}