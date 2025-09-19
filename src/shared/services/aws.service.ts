import { ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AwsService {
    private client: S3Client;
    private bucketName: string;
    private s3Region: string;

    private logger = new Logger(AwsService.name)

    constructor(private configService: ConfigService) {
        this.bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
        this.s3Region = this.configService.get("AWS_S3_BUCKET_REGION");

        this.client = new S3Client({
            region: this.s3Region,
            credentials: {
                accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY")
            },
            forcePathStyle: true,
        });

        
    }


    async uploadSingleFile(file: Express.Multer.File, imageHash: string, isPublic = true):  Promise<string> {
            
            const key = `${imageHash}/${file.originalname}`;

            // check if image already exists 
            let url: string
            this.logger.log("Uploading image to S3 bucket.........")
            if (await this.isFolderExistsInS3Bucket(imageHash)) {
                this.logger.log('reusing image of matching buffer hash')
                url = `https://${this.bucketName}.s3.amazonaws.com/${key}`
            } else {
                const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: isPublic ? 'public-read': 'private',

                Metadata: {
                    originalName: file.originalname,
                },
            }); 

            
            const uploadResult = await this.client.send(command);
            
            url = `https://${this.bucketName}.s3.amazonaws.com/${key}`
        }
            
            this.logger.log("Image upload complete!")
        return url;
    }


    private async isFolderExistsInS3Bucket(folderName:string) {
       
        const command = new ListObjectsCommand({
                Bucket: this.bucketName,
                Prefix: folderName,
                MaxKeys: 2
            })
            
        const result = await this.client.send(command)
        if (result.Contents) {
                return true
            }
        return false
       }
}