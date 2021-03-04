import { Request, Response } from "express";
import { TagsBusiness } from "../business/TagsBusiness";

export class TagsController {

    async create(req: Request, res: Response) {
        try {
            const name = req.body.name;
            const token = req.headers.authorization!;

            const tagsBusiness = new TagsBusiness();
            await tagsBusiness.create(name, token);
            res.status(200).send({ message: "tag created sucessfully"});
        }
        catch(err) {
            res.status(err.code || 400).send ({ message: err.message})
        }
    }

    async get(req: Request, res: Response) {
        try {
            const token = req.headers.authorization!;
            const tagsBusiness = new TagsBusiness();
            const tags = await tagsBusiness.get(token);

            res.status(200).send({ tags })
        }
        catch(err) {
            res.status(err.code || 400).send ({ message: err.message})
        }
    }
}