export class ErrorResponseDto {
    success = false;
    stausCode: number;
    message: string;
    timestamp = new Date()

    constructor(statusCode: number, message: string) {
        this.stausCode = statusCode;
        this.message = message;
    }
}