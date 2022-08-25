import {createConnection} from "typeorm"
import {Client} from "./entities/Client";
import {Banker} from "./entities/Banker";
import {Transaction} from "./entities/Transaction";
import express from "express"
import {createClientRouter} from "./routes/create_client";
import {createBankerRouter} from "./routes/create_banker";
import {CreateTransactionRouter} from "./routes/create_transaction";
import {ConnectBankerToClient} from "./routes/connect_banker_to_client";
import {DeleteClientRoute} from "./routes/delete-client";
import {FetchClientsRouter} from "./routes/fetch-clients";


const app = express();

const main = async () => {
    try {
        const connection = await createConnection({
            type: "postgres",
            host: 'localhost',
            port: 5432,
            username: 'root',
            password: undefined,
            database: 'typeorm_banking',
            entities: [Client, Banker, Transaction],
            synchronize: true,
        })
        console.log("Connected to the postgres")

        app.use(express.json())
        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(CreateTransactionRouter)
        app.use(ConnectBankerToClient)
        app.use(DeleteClientRoute)
        app.use(FetchClientsRouter)
        app.listen(8090, () => {
            console.log('app is running on http://localhost:8090')
        })
    } catch (e) {
        console.log(e)
        console.log("unable to Connect to the postgres")
    }
}

main()
