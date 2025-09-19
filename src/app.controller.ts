import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get("/healthcheck")
    async performServerHealthCheck() {
        return "Server Healthy!"
    }
}