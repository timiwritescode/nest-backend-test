import { Extension } from "@prisma/client";


export class ExtensionDTO {
    id: string;
    name: string;
    status: string;
    description: string
    avatarUrl: string
    dateCreated: string

    constructor(extension: Extension) {
        this.id = extension.id
        this.name = extension.name;
        this.status = extension.status;
        this.description = extension.description;
        this.avatarUrl = extension.avatarURL;
        this.dateCreated = extension.createdAt.toISOString();
    }

}


export class MultipleExtensionsDTO {
    extensions: ExtensionDTO[];

    constructor(extensions: Extension[]) {
        this.extensions = extensions.map(extension => new ExtensionDTO(extension));
    }
}