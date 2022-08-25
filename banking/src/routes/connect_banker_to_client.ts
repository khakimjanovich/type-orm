import express from "express";
import {Client} from "../entities/Client";
import {Banker} from "../entities/Banker";

const router = express.Router()

router.post('/api/clients/:client_id/bankers/:banker_id',
    async (req, res) => {
        const {client_id, banker_id} = req.params

        const client = await Client.findOne({where: {id: parseInt(client_id)}})
        const banker = await Banker.findOne({where: {id: parseInt(banker_id)}})

        if (!client || !banker) {
            return res.json({
                status: false,
                message: 'Banker or client not found!'
            })
        }

        banker.clients = [client]

        await Banker.save(banker)

        return res.json({
            status: true,
            message: 'Banker connected to a client!'
        })
    })

export {
    router as ConnectBankerToClient
}
