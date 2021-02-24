import { Request, Response } from "express";
import { ImageInputDTO } from "../business/entities/Image";

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

            // await imageBusiness.newImage(input)

            res.sendStatus(200)
        }
        catch(error){
            res.status(400).send({ message: error.message})
        }
    }

}