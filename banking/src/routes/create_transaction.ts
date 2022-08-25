import express from "express";
import {Client} from "../entities/Client";
import {Transaction, TransactionTypes} from "../entities/Transaction";

const router = express.Router()

router.post('/api/clients/:client_id/transaction', async (req, res) => {
    const {client_id} = req.params
    const {type, amount} = req.body
    const client = await Client.findOne({where: {id: parseInt(client_id)}})

    if (!client) {
        return res.json({
            status: false,
            message: "Client not found!"
        })
    }

    const transaction = await Transaction.create({amount, type, client})
    await Transaction.save(transaction)

    if (type === TransactionTypes.DEPOSIT) {
        client.balance = client.balance + amount
    } else if (type === TransactionTypes.WITHDRAW) {
        client.balance = client.balance - amount
    }

    await Client.save(client)

    return res.json({
        status: true,
        msg: 'transaction was successful'
    })
})

export {
    router as CreateTransactionRouter
}
