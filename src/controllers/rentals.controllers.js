import { db } from '../database/database.connection.js'

export async function getListRentals(req, res) {
    try {
        const RENTALS_QUERY_RESULT = await db.query(`
        SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
      `)

        const LIST_RENTALS = []
        for (const rental of RENTALS_QUERY_RESULT.rows) {
            const customer = { id: rental.customerId, name: rental.customerName }
            const game = { id: rental.gameId, name: rental.gameName }
            const rentalObject = { ...rental, customer, game }
            LIST_RENTALS.push(rentalObject)
        }

        res.send(LIST_RENTALS)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function postInsertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        const CUSTOMER_RESULT = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
        const GAME_RESULT = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);

        if (CUSTOMER_RESULT.rowCount === 0 || GAME_RESULT.rowCount === 0) {
            return res.sendStatus(400);
        }

        const RENTAL_COUNT_RESULT = await db.query(`
                SELECT COUNT(*) as count FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL
            `, [gameId]);

        const STOCK_TOTAL = GAME_RESULT.rows[0].stockTotal;
        const RENTAL_COUNT = RENTAL_COUNT_RESULT.rows[0].count;

        if (RENTAL_COUNT >= STOCK_TOTAL) {
            return res.sendStatus(400);
        }

        const rentDate = new Date().toISOString().slice(0, 10);
        const ORIGINAL_PRICE = daysRented * GAME_RESULT.rows[0].pricePerDay;

        await db.query(`
                INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
                VALUES ($1, $2, $3, $4, $5, null, null);
            `, [customerId, gameId, daysRented, rentDate, ORIGINAL_PRICE]);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postFinishRental(req, res) {
    try {
        const { id } = req.params;
        const currentDate = new Date().toISOString().slice(0, 10);

        const RENTAL_QUERY = `
            SELECT rentals.*, games."pricePerDay"
            FROM rentals
            JOIN games ON rentals."gameId" = games.id
            WHERE rentals."id" = $1;
        `;
        const RENTAL_RESULT = await db.query(RENTAL_QUERY, [id]);
        const RENTAL = RENTAL_RESULT.rows[0];

        if (!RENTAL) {
            return res.sendStatus(404);
        }

        if (RENTAL.returnDate !== null) {
            return res.sendStatus(400);
        }

        const { rentDate, daysRented, pricePerDay } = RENTAL;
        const daysLate = Math.max(
            Math.floor(
                (Date.now() - new Date(rentDate).getTime()) / (24 * 60 * 60 * 1000) - daysRented
            ),
            0
        );
        const lateFee = daysLate > 0 ? daysLate * pricePerDay : null;

        const UPDATE_QUERY = `
            UPDATE rentals
            SET "returnDate" = $1, "delayFee" = $2
            WHERE "id" = $3;
        `;
        await db.query(UPDATE_QUERY, [currentDate, lateFee, id]);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        const RENTAL_QUERY = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if (RENTAL_QUERY.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (RENTAL_QUERY.rows[0].returnDate === null) {
            return res.sendStatus(400);
        }

        const DELETE_QUERY = `DELETE FROM rentals WHERE "id" = $1;`;
        await db.query(DELETE_QUERY, [id]);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}



