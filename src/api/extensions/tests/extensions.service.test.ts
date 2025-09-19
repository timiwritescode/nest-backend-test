import { Test, TestingModule } from "@nestjs/testing";
import { ExtensionsService } from "../extensions.service"
import { AwsService } from "src/shared/services/aws.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { mockExtensions, mockFile } from "./mocks/service-test-mocks";
import { CreateExtensionDTO } from "../dtos/create-extension.dto";
import { SuccessResponseDTO } from "src/shared/dtos/success-response.dto";
import { EXTENSION_CREATED } from "../success-messages";
import { BadRequestException, HttpStatus, NotFoundException } from "@nestjs/common";
import { ExtensionDTO } from "../dtos/extension.dto";
import { Extension, Prisma } from "@prisma/client";
import { ExtensionStatus } from "../extension-status";
import * as utils from "src/shared/utils/util";




describe("ExtensionService", () => {
    let extensionService: ExtensionsService;

    let mockAwsService = {
       uploadSingleFile: jest.fn().mockResolvedValue("https://mock-s3-url.com/image.png") 
    }

    let mockDbOperations = {
        create: jest.fn().mockImplementation(({data}) => {
            return {
                id: "mock-id",
                name: data.name,
                description: data.description,
                status: data.status,
                avatarURL: data["avatarURL"],
                createdAt: new Date(),
                updatedAt: new Date()
            } 
        }),

        findMany: jest.fn().mockResolvedValue(mockExtensions),

        findUnique: jest.fn().mockResolvedValue(mockExtensions[0]),

        update: jest.fn().mockResolvedValue(mockExtensions[0]),

        delete: jest.fn().mockResolvedValue(null)
    };

    let mockPrismaService = {
        extension: mockDbOperations
    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ExtensionsService, AwsService, PrismaService]
        }).overrideProvider(AwsService)
        .useValue(mockAwsService)
        .overrideProvider(PrismaService)
        .useValue(mockPrismaService)
        .compile();

        extensionService = module.get<ExtensionsService>(ExtensionsService);
    })

    afterEach(() => {
        jest.clearAllMocks();
        
    })

    it("should be defined", () => {
        expect(extensionService).toBeDefined();
    })

    describe("Create user", () => {
        
        it('should create user and upload image when dto and image is provided', async () => {
            const dto: CreateExtensionDTO = {
                name: "Create extension test",
                description: "Mock for dto",
                status: ExtensionStatus.ACTIVE,
                avatar: mockFile
            }
        

        const response = await extensionService.createExtension(dto, dto.avatar);

        expect(response.success).toBe(true);
        expect(response.data.avatarUrl).toBeDefined();
        expect(response.data.avatarUrl).toBe("https://mock-s3-url.com/image.png")
        
        })

        it('should call uploadSingleFile with image and generated hash', async () => {
            const dto: CreateExtensionDTO = {
                name: "Create extension test",
                description: "Mock for dto",
                status: ExtensionStatus.ACTIVE,
              
            };

            jest.spyOn(utils, 'generateFileHash').mockReturnValue('mocked-hash');

            await extensionService.createExtension(dto, mockFile);

            expect(mockAwsService.uploadSingleFile).toHaveBeenCalled();
            expect(mockAwsService.uploadSingleFile).toHaveBeenCalledWith(mockFile, 'mocked-hash')
        })

        it('should not call uploadSingleFile when image not passed', async () => {
        const dto: CreateExtensionDTO = {
                name: "Create extension test",
                description: "Mock for dto",
                status: ExtensionStatus.ACTIVE,
              
            };

        await extensionService.createExtension(dto);

        expect(mockAwsService.uploadSingleFile).not.toHaveBeenCalled()
    })

    it("should create extension withoud image being passed", async () => {
        const dto: CreateExtensionDTO = {
                name: "Create extension test",
                description: "Mock for dto",
                status: ExtensionStatus.ACTIVE,
              
            };
        const response = await extensionService.createExtension(dto);

        expect(response.success).toBe(true)
        expect(response.data.name).toBe(dto.name)
        expect(response.data.avatarUrl).toBeUndefined()
    })
    })


    describe("Get Extensions", () => {
        it("should return paginated data", async () => {
            const response = await extensionService.getExtensions();
            
            expect(response.success).toBe(true);
            expect(response.data.extensions.length).toBe(5);

        })

        it('should call findMany with pagination parameters', async () => {
            await extensionService.getExtensions(1, 12);
            let callValues = {
                skip: 0,
                orderBy: {
                    createdAt: "desc"
                },
                take: 12,
                where: undefined
            }
            expect(mockPrismaService.extension.findMany).toHaveBeenCalledWith(callValues)
        
            await extensionService.getExtensions(2, 24);
        
            callValues.skip = 24;
            callValues.take = 24;
            expect(mockPrismaService.extension.findMany).toHaveBeenCalledWith(callValues)
        
        
        })

        it('should call findMany with status parameter passed', async () => {
        await extensionService.getExtensions(1, 12,"active");

        const callValues = {
            skip: 0,
            orderBy: {
                createdAt: "desc"
            },
            take: 12,
            where: {status: {equals: "active"}}
        }

        expect(mockPrismaService.extension.findMany).toHaveBeenCalledWith(callValues);
    })

    })


    describe("Get Extension by id", () => {
        it("should return success response upon valid id", async () => {
            const response = await extensionService.getExtensionById("mock-id");

            expect(response.success).toBe(true);
            expect(response.data).toBeInstanceOf(ExtensionDTO);
            expect(response.statusCode).toBe(200)
        })

        it("should throw not found exception upon extension not found", async () => {
            mockPrismaService.extension.findUnique.mockResolvedValue(null);

            await expect(extensionService.getExtensionById("mock-id")).rejects.toThrow(BadRequestException)
        })
    })

    describe("Update Extension", () => {
    it("should update extension when extension exists", async () => {
        const extensionInDb = {
        id: "mock-id",
        name: "Old name",
        description: "Old description",
        status: ExtensionStatus.INACTIVE,
        avatarURL: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        };

        const updatedExtension = {
        ...extensionInDb,
        name: "Updated name",
        description: "Updated description",
        status: ExtensionStatus.ACTIVE,
        avatarURL: "https://mock-s3-url.com/image.png",
        };

        mockPrismaService.extension.findUnique.mockResolvedValue(extensionInDb);
        mockPrismaService.extension.update = jest.fn().mockResolvedValue(updatedExtension);

        const dto = {
        name: "Updated name",
        description: "Updated description",
        status: ExtensionStatus.ACTIVE,
        };

        const response = await extensionService.updateExtension("mock-id", dto, mockFile);

        expect(mockPrismaService.extension.findUnique).toHaveBeenCalledWith({ where: { id: "mock-id" } });
        expect(mockAwsService.uploadSingleFile).toHaveBeenCalled();
        expect(mockPrismaService.extension.update).toHaveBeenCalledWith({
        where: { id: "mock-id" },
        data: { ...dto, avatarURL: "https://mock-s3-url.com/image.png" },
        });
        expect(response.success).toBe(true);
        expect(response.data.name).toBe("Updated name");
    });

    it("should throw NotFoundException when extension does not exist", async () => {
        mockPrismaService.extension.findUnique.mockResolvedValue(null);

        await expect(extensionService.updateExtension("non-existent-id", {}))
        .rejects
        .toThrow(NotFoundException);
    });
});

describe("Delete Extension", () => {
  it("should delete extension when it exists", async () => {
    mockPrismaService.extension.delete = jest.fn().mockResolvedValue({ id: "mock-id" });

    const response = await extensionService.deleteExtension("mock-id");

    expect(mockPrismaService.extension.delete).toHaveBeenCalledWith({
      where: { id: "mock-id" },
    });
    expect(response.success).toBe(true);
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it("should throw NotFoundException when extension does not exist", async () => {
    const error = new Prisma.PrismaClientKnownRequestError("Not found", {
      code: "P2025",
      clientVersion: "6.0.0",
    } as any);

    mockPrismaService.extension.delete = jest.fn().mockRejectedValue(error);

    await expect(extensionService.deleteExtension("non-existent-id")).rejects.toThrow(
      NotFoundException,
    );
  });
});

    
})