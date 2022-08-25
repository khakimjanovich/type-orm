import express from "express";
import {Client} from "../entities/Client";

const router = express.Router()

router.delete('/api/clients/:client_id', async (req, res) => {
    const {client_id} = req.params;

    const client = Client.findOne({where: {id: parseInt(client_id)}})
    if (!client) {
        return res.json({
            status: false,
            message: 'Client not found!'
        })
    }

    await Client.delete(parseInt(client_id))
    return res.json({
        status: true,
        message: 'Client deleted successfully!'
    })
})
export {
    router as DeleteClientRoute
}
