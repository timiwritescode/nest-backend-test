import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Extension API')
    .setDescription('API for the extensions backend')
    .setVersion('1.0')
    .addTag('Extensions')
    .build();
