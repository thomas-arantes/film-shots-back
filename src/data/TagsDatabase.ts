import { tags } from "../business/entities/Tags";
import { BaseDatabase } from "./BaseDatabase";

export class TagsDatabase extends BaseDatabase {
    private static TABLE_NAME = "filmshots_tags";

    async create(id: string, name: string) {
        try {
            await BaseDatabase.getConnection()
            .insert({ id, name })
            .into(TagsDatabase.TABLE_NAME)
        }
        catch(err) {

            if(err.errno === 1062){
                throw new Error("Duplicate Entry")
            }

            throw new Error(err.sqlMessage || err.message)
        }
    }

    async get(): Promise<tags[]> {

        try {
            const result = await BaseDatabase.getConnection()
            .select("*")
            .from(TagsDatabase.TABLE_NAME);

            const tags: tags[] = [];

            for (let tag of result) {
                tags.push({ id: tag.id, name: tag.name })
            }

            return tags;
        }
        catch(err) {
            throw new Error ("cannot find this tag" + err.sqlMessage)
        }
    }
}