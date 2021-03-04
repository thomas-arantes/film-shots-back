import express from "express";
import { TagsController } from "../TagsController";


export const tagsRouter = express.Router();

const tagsController = new TagsController();

tagsRouter.post("/create", tagsController.create);
tagsRouter.get("/all", tagsController.get);
