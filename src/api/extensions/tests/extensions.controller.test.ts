import { Test, TestingModule } from "@nestjs/testing";
import { ExtensionsController } from "src/api/extensions/extensions.controller";
import { ExtensionsService } from "src/api/extensions/extensions.service";
import { CreateExtensionDTO } from "src/api/extensions/dtos/create-extension.dto";
import { UpdateExtensionDTO } from "src/api/extensions/dtos/update-extension.dto";
import { SuccessResponseDTO } from "src/shared/dtos/success-response.dto";
import { ExtensionDTO } from "src/api/extensions/dtos/extension.dto";
import { HttpStatus } from "@nestjs/common";
import { ExtensionStatus } from "../extension-status";


const mockExtensionsService = {
  createExtension: jest.fn(),
  getExtensions: jest.fn(),
  getExtensionById: jest.fn(),
  updateExtension: jest.fn(),
  deleteExtension: jest.fn(),
};

describe("ExtensionsController", () => {
  let controller: ExtensionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtensionsController],
      providers: [
        {
          provide: ExtensionsService,
          useValue: mockExtensionsService,
        },
      ],
    }).compile();

    controller = module.get<ExtensionsController>(ExtensionsController);
    jest.clearAllMocks();
  });

  describe("createExtension", () => {
    it("should call service with dto and avatar", async () => {
      const dto: CreateExtensionDTO = {
        name: "Test Extension",
        description: "Description",
        status: ExtensionStatus.ACTIVE,
      };
      const mockFile = { buffer: Buffer.from("file") } as Express.Multer.File;

      const expectedResponse = new SuccessResponseDTO(
        "Extension created",
        HttpStatus.CREATED,
        new ExtensionDTO({
          id: "1",
          name: dto.name,
          description: dto.description,
          status: dto.status,
          avatarURL: "http://mock-url.com/image.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );

      mockExtensionsService.createExtension.mockResolvedValue(expectedResponse);

      const result = await controller.createExtension(dto, mockFile);

      expect(mockExtensionsService.createExtension).toHaveBeenCalledWith(dto, mockFile);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getAllExtensions", () => {
    it("should call service with pagination and status", async () => {
      const expectedResponse = new SuccessResponseDTO("Success", HttpStatus.OK, {
        items: [],
        total: 0,
      });

      mockExtensionsService.getExtensions.mockResolvedValue(expectedResponse);

      const result = await controller.getAllExtensions("ACTIVE", 2, 20);

      expect(mockExtensionsService.getExtensions).toHaveBeenCalledWith(2, 20, "ACTIVE");
      expect(result).toEqual(expectedResponse);
    });

    it("should default to page=1 and pageSize=12 when not provided", async () => {
      const expectedResponse = new SuccessResponseDTO("Success", HttpStatus.OK, {
        items: [],
        total: 0,
      });

      mockExtensionsService.getExtensions.mockResolvedValue(expectedResponse);

      const result = await controller.getAllExtensions("", undefined, undefined);

      expect(mockExtensionsService.getExtensions).toHaveBeenCalledWith(1, 12, "");
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("getExtensionById", () => {
    it("should call service with extensionId", async () => {
      const expectedResponse = new SuccessResponseDTO("Success", HttpStatus.OK, {
        id: "mock-id",
      } as ExtensionDTO);

      mockExtensionsService.getExtensionById.mockResolvedValue(expectedResponse);

      const result = await controller.getExtensionById("mock-id");

      expect(mockExtensionsService.getExtensionById).toHaveBeenCalledWith("mock-id");
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("editExtension", () => {
    it("should call service with extensionId, dto and avatar", async () => {
      const dto: UpdateExtensionDTO = {
        name: "Updated Extension",
        description: "Updated description",
        status: ExtensionStatus.INACTIVE,
      };
      const mockFile = { buffer: Buffer.from("file") } as Express.Multer.File;

      const expectedResponse = new SuccessResponseDTO(
        "Extension updated",
        HttpStatus.OK,
        new ExtensionDTO({
          id: "1",
          name: dto.name,
          description: dto.description,
          status: dto.status,
          avatarURL: "http://mock-url.com/image.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );

      mockExtensionsService.updateExtension.mockResolvedValue(expectedResponse);

      const result = await controller.editExtension("1", dto, mockFile);

      expect(mockExtensionsService.updateExtension).toHaveBeenCalledWith("1", dto, mockFile);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe("deleteExtension", () => {
    it("should call service with extensionId", async () => {
      const expectedResponse = new SuccessResponseDTO("Extension deleted", HttpStatus.OK, undefined);

      mockExtensionsService.deleteExtension.mockResolvedValue(expectedResponse);

      const result = await controller.deleteExtension("mock-id");

      expect(mockExtensionsService.deleteExtension).toHaveBeenCalledWith("mock-id");
      expect(result).toEqual(expectedResponse);
    });
  });
});
