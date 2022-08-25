import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entity/User"
import {Photo} from "./entity/Photo";
import {PhotoMetadata} from "./entity/PhotoMetadata";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "typeorm_docs01",
    synchronize: true,
    logging: false,
    entities: [User, Photo, PhotoMetadata],
    migrations: [],
    subscribers: [],
})
