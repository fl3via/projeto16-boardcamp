import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'



// FUNÇÕES DE ALUGUEIS 
export async function getListarAlugueis(req, res) {
    try {
        const rentals = await db.query(`
            SELECT rentals.*, customers.name AS "nomeCliente", games.name AS "nomeJogo"
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
        `)

        const result = rentals.rows.map(({ customerId, customerName, gameId, gameName, ...rest  }) => ({
            ...rest,
            customers: { id: customerId, name: customerName },
        game: { id: gameId, name: gameName }
        }))

        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//Criar aluguel
export async function postInserirAluguel(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const customerResult = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId])
        const gameResult = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId])

        if (customerResult.rowCount === 0 || gameResult.rowCount === 0) {
            return res.sendStatus(400)
        }

        const rentalCountResult = await db.query(`
                SELECT COUNT(*) as count FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL
            `, [gameId])

        const stockTotal = gameResult.rows[0].stockTotal
        const rentalCount = rentalCountResult.rows[0].count

        if (rentalCount >= stockTotal) {
            return res.sendStatus(400)
        }

        const rentDate = new Date().toISOString().slice(0, 10);
        const originalPrice = daysRented * gameResult.rows[0].pricePerDay

        await db.query(`
                INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
                VALUES ($1, $2, $3, $4, $5, null, null);
            `, [customerId, gameId, daysRented, rentDate, originalPrice])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}



export async function postFinalizarAluguel(req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function apagarAluguel(req, res) {
    try {

    } catch (err) {
        res.status(500).send(err.message)
    }
}











