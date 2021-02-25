import { Request, Response } from "express";
import { ImageInputDTO } from "../business/entities/Image";
import { ImageBusiness } from "../business/ImageBusiness";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageDatabase } from "../data/ImageDatabase";

export class ImageController {
    async newImage(req: Request, res: Response){
        try{
            const input: ImageInputDTO = {
                subtitle: req.body.subtitle,
                author: req.body.author,
                date: req.body.date,
                file: req.body.file,
                tags: req.body.tags,
                collection: req.body.collection
            }

            const imageBusiness = new ImageBusiness (
                new ImageDatabase,
                new IdGenerator,
                new Authenticator
            )

            await imageBusiness.newImage(input, req.headers.authorization as string)

            res.sendStatus(200)
        }
        catch(error){
            res.status(400).send({ message: error.message})
        }
        finally {
            await BaseDatabase.destroyConnection()
        }
    }

}