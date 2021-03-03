import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator"
import { tags } from "./entities/Tags"

export class TagsBusiness {
    async create(name: string, token: string): Promise<void> {

        try {
            if(!name){
                throw new Error("invalid name")
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const authenticator = new Authenticator();
            const verifiedToken = authenticator.getData(token)

            if(!verifiedToken) {
                throw new Error("please login");
            }

            const tagsDatabase = new TagsDatabase();
            await tagsDatabase.create(id, name);
        }
        catch(err) {
            throw new CustomError(err.message, err.code)
        }
    }

    async get(token: string): Promise<tags[]> {

        try {
            const authenticator = new Authenticator();
            const verifiedToken = authenticator.getData(token);

            if(!verifiedToken) {
                throw new Error ("please login")
            }

            const tagsDatabase = new TagsDatabase();
            const tags: tags[] = await tagsDatabase.get();
            return tags;
        }
        catch(err) {
            throw new CustomError(err.message, err.code)
        }
    }
}