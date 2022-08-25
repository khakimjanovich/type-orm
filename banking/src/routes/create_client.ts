import express from "express";
import {Client} from "../entities/Client";

const router = express.Router()

router.post('/api/clients', async (req, res) => {
    const {first_name, last_name, email, card_number, balance} = req.body

    const email_client = await Client.findOne({where: {email}})

    if (email_client) {
        return res.json({
            status: false,
            message: 'Client with this email already exists!'
        })
    }

    const card_client = await Client.findOne({where: {card_number}})
    if (card_client) {
        return res.json({
            status: false,
            message: 'Client with this card exists!'
        })
    }
    const client = await Client.create({first_name, last_name, email, card_number, balance})
    await Client.save(client)

    return res.json(client);
})

export {
    router as createClientRouter
}
