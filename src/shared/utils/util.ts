import { createHash } from "crypto";

/**
 * Generates a hash of the buffers of file which can be used
 * as a file storage key to prevent duplicate storage in the filesystem
 * @param fileBuffer 
 * @returns Hash of file
 */
export function generateFileHash(fileBuffer: Buffer): string {
      const hash = createHash("sha256");
      hash.update(fileBuffer);
      return hash.digest("hex");
    
  }