import { ArgumentsHost, 
    Catch, 
    ExceptionFilter, 
    HttpException, 
    Logger } from "@nestjs/common";
import {Response, Request} from "express"
import { ErrorResponseDto } from "src/shared/dtos/error-response.dto";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    private logger = new Logger(AllExceptionsFilter.name)
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        
        const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;
        const message = exception instanceof HttpException ? exception.message : "An error occured";


          const stack = exception instanceof Error ? exception.stack : null;
        
       

        if (!(exception instanceof HttpException)) {
            this.logger.error({
            message: (exception as any).message || 'Unhandled exception',
            path: request.url,
            method: request.method,
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            stack: process.env.NODE_ENV === "production"? "" : stack,
            });

        }
        response.status(statusCode).json(
            new ErrorResponseDto(statusCode, message)
        );
        
        
    }
}