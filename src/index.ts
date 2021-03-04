import express from "express";
import { AddressInfo } from "net";
import { userRouter } from "./controller/routes/userRouter";
import { imageRouter } from "./controller/routes/imageRouter"
import { tagsRouter } from "./controller/routes/tagsRouter"

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use("/tags", tagsRouter)

const server = app.listen(3002, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
   } else {
      console.error(`Falha ao rodar o servidor.`);
   }
});  