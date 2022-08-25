import express from "express";
import {Client} from "../entities/Client";
import {createQueryBuilder} from "typeorm";

const router = express.Router()

router.get('/api/clients', async (req, res) => {
    // const clients = await Client.find()
    const clients = await createQueryBuilder('clients')
        .select('clients.id')
        .addSelect('clients.first_name')
        .addSelect('clients.last_name')
        .addSelect('clients.email')
        .addSelect('clients.balance')
        .from(Client, 'clients')
        .leftJoinAndSelect(
            'clients.transactions',
            'transactions'
        )
        .getMany()

    clients.map((client) => {
        client.balance = parseFloat(String(client.balance))
        return client;
    })

    return res.json({
        status: true,
        data: clients
    })
})

export {
    router as FetchClientsRouter
}
