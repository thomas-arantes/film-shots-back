import express from "express";
import { ImageController } from "../ImageController";

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/new", imageController.newImage)