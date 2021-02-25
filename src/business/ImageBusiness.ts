import { ImageDatabase } from "../data/ImageDatabase";
import { Image, ImageInputDTO } from "./entities/Image";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class ImageBusiness {
    constructor(
        private imageDatabase: ImageDatabase,
        private IdGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async newImage(input: ImageInputDTO, token: string) {
        const tokenData = this.authenticator.getData(token)

        if(!input.subtitle || !input.author || !input.date || !input.file || !input.tags || !input.collection) {
            throw new Error("Invalid input to newImage")
        }

        await this.imageDatabase.uploadImage(
            Image.toImage({
                ...input,
                id: this.IdGenerator.generate()
            })!
        )
    }
}