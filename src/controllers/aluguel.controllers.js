import { db } from '../database/database.connection.js'

// FUNÇÕES DE ALUGUEIS 
export async function getListarAlugueis(req, res) {
    try {
      const alugueisQuery = `
        SELECT rentals.*, customers.name AS customer_name, games.name AS game_name, games."pricePerDay"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
      `
      const alugueisResult = await db.query(alugueisQuery)
      const alugueis = alugueisResult.rows.map((aluguel) => ({
        id: aluguel.id,
        customerId: aluguel.customerId,
        gameId: aluguel.gameId,
        rentDate: aluguel.rentDate instanceof Date ? aluguel.rentDate.toISOString().slice(0, 10) : null,
        daysRented: aluguel.daysRented,
        returnDate: aluguel.returnDate,
        originalPrice: aluguel.daysRented * aluguel.pricePerDay, 
        delayFee: aluguel.atraso !== null ? aluguel.atraso : null,
        customer: {
          id: aluguel.customerId,
          name: aluguel.customer_name,
        },
        game: {
          id: aluguel.gameId,
          name: aluguel.game_name,
        },
      }))
  
      res.send(alugueis)
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
        const { id } = req.params
        const currentDate = new Date().toISOString().slice(0, 10)

        const aluguelQuery = `
            SELECT rentals.*, games."pricePerDay"
            FROM rentals
            JOIN games ON rentals."gameId" = games.id
            WHERE rentals."id" = $1;
        `
        const aluguelResult = await db.query(aluguelQuery, [id])
        const aluguel = aluguelResult.rows[0]

        if (!aluguel) {
            return res.sendStatus(404)
        }

        if (aluguel.returnDate !== null) {
            return res.sendStatus(400)
        }

        const { rentDate, daysRented, pricePerDay } = aluguel
        const atrasoDias = Math.max(
            Math.floor(
                (Date.now() - new Date(rentDate).getTime()) / (24 * 60 * 60 * 1000) - daysRented
            ),
            0
        )
        const atraso = atrasoDias > 0 ? atrasoDias * pricePerDay : null

        const updateQuery = `
            UPDATE rentals
            SET "returnDate" = $1, "delayFee" = $2
            WHERE "id" = $3;
        `
        await db.query(updateQuery, [currentDate, atraso, id])

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function apagarAluguel(req, res) {
    const { id } = req.params;
    try {
        const aluguelQuery = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if (aluguelQuery.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (aluguelQuery.rows[0].returnDate === null) {
            return res.sendStatus(400);
        }

        const deleteQuery = `DELETE FROM rentals WHERE "id" = $1;`;
        await db.query(deleteQuery, [id]);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


