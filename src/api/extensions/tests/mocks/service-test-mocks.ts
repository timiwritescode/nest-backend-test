import { Readable } from "stream";

export const mockExtensions = [
  {
    id: "1",
    name: "Dark Mode Enhancer",
    description: "Adds advanced dark mode features to the app.",
    status: "active",
    avatarURL: "https://example.com/avatars/darkmode.png",
    createdAt: new Date("2025-01-01T10:00:00.000Z"),
    updatedAt: new Date("2025-01-05T12:00:00.000Z"),
  },
  {
    id: "2",
    name: "Translator Pro",
    description: "Real-time translation for multiple languages.",
    status: "inactive",
    avatarURL: "https://example.com/avatars/translator.png",
    createdAt: new Date("2025-01-10T09:30:00.000Z"),
    updatedAt: new Date("2025-01-12T15:00:00.000Z"),
  },
  {
    id: "3",
    name: "AI Assistant",
    description: "Smart AI helper for productivity tasks.",
    status: "active",
    avatarURL: "https://example.com/avatars/ai.png",
    createdAt: new Date("2025-02-01T08:45:00.000Z"),
    updatedAt: new Date("2025-02-02T10:15:00.000Z"),
  },
  {
    id: "4",
    name: "Focus Booster",
    description: "Blocks distractions and improves focus.",
    status: "inactive",
    avatarURL: "https://example.com/avatars/focus.png",
    createdAt: new Date("2025-02-05T14:20:00.000Z"),
    updatedAt: new Date("2025-02-06T16:10:00.000Z"),
  },
  {
    id: "5",
    name: "Cloud Sync",
    description: "Syncs data securely across devices.",
    status: "active",
    avatarURL: "https://example.com/avatars/cloud.png",
    createdAt: new Date("2025-03-01T11:00:00.000Z"),
    updatedAt: new Date("2025-03-03T13:30:00.000Z"),
  },
];


export const mockFile: Express.Multer.File = {
  fieldname: "avatar",
  originalname: "test.png",
  encoding: "7bit",
  mimetype: "image/png",
  size: 1234,
  stream: new Readable(),
  destination: "/uploads",
  filename: "test.png",
  path: "/uploads/test.png",
  buffer: Buffer.from([0x89, 0x50, 0x4e, 0x47]) 
};
