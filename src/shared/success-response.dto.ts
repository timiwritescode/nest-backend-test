export class SuccessResponseDTO<T> {
    success = true;
    message: string;
    statusCode: number;
    data: T;
    timestamp = new Date();


    constructor(message: string, statusCode: number, data: T) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}