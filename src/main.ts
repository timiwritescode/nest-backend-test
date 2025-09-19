import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/filters/global-error.filter';
import { ValidationError } from 'class-validator';
import axios from 'axios';


async function keepServerAlive(liveURL: string) {
  return (await axios.get(liveURL)).data;
}


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[]) => {
    return new BadRequestException(
      validationErrors.map((error) => Object.values(error.constraints).join('; ')).join('; ')
    )
  }
  }))
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix("/api/v1", {
    exclude: ["/healthcheck"]
  })
  await app.listen(process.env.PORT || 3000);

  if(process.env.NODE_ENV="production") {
    setInterval(async () => {
      try {
              console.log("healthcheck started")
      const serverResponse = await keepServerAlive(process.env.LIVE_URL);
      console.log(serverResponse);        
      } catch (error) {
        console.log(error.message)
      }

    }, 10000)
  }
}
bootstrap();
