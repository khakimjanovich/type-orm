import express from "express";
import {Banker} from "../entities/Banker";

const router = express.Router()

router.post('/api/bankers', async (req, res) => {
    const {first_name, last_name, email, card_number, employee_number} = req.body

    const email_banker = await Banker.findOne({where: {email}})

    if (email_banker) {
        return res.json({
            status: false,
            message: 'Banker with this email already exists!'
        })
    }

    const card_banker = await Banker.findOne({where: {card_number}})
    if (card_banker) {
        return res.json({
            status: false,
            message: 'Banker with this card exists!'
        })
    }

    const employee_number_banker = await Banker.findOne({where: {employee_number}})
    if (employee_number_banker) {
        return res.json({
            status: false,
            message: 'Banker with this employee number exists!'
        })
    }

    const banker = await Banker.create({first_name, last_name, email, card_number, employee_number})
    await Banker.save(banker)

    return res.json(banker);
})

export {
    router as createBankerRouter
}
