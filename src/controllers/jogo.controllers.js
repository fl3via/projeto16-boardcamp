import { db } from '../database/database.connection.js'

// FUNÇÕES DE JOGOS

export async function getListarJogos(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games;`)
        res.send(games.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// cria o jogo
export async function postInserirJogo(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body

    try {
        const game = await db.query(`SELECT * FROM games WHERE name = $1;`, [name])
        if (game.rowCount !== 0) return res.sendStatus(409)

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}