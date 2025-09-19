import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";
import * as path from 'path';


@Injectable()
export class PrismaService 
        extends PrismaClient
        implements OnModuleInit, OnModuleDestroy {
    
    async onModuleInit() {
        
        await this.$connect();
    } 

    async onModuleDestroy() {
        await this.$disconnect();
    }

        }