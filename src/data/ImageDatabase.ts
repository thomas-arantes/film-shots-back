import { Image } from "../business/entities/Image";
import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {
    
    private static TABLE_NAME = "film-shots-images"

    public async uploadImage(image: Image): Promise<void> {
        try {
            await BaseDatabase.getConnection
            .insert({
                id: image.getId(),
                subtitle: image.getSubtitle(),
                author: image.getAuthor(),
                date: Date.now(),
                file: image.getFile(),
                tags: image.getTags(),
                collection: image.getCollection()
            }) .into(ImageDatabase.TABLE_NAME)
        }
        catch(error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}