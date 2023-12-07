import { db } from '../database/database.connection.js';

export async function getAllCustomers(req, res) {
    try {
        const CLIENTS = await db.query(`
        SELECT id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') as birthday FROM customers;`);
        res.send(CLIENTS.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    try {
        const CLIENTS = await db.query(`
        SELECT id, name, phone, cpf, to_char(birthday, 'YYYY-MM-DD') as birthday FROM customers WHERE id = $1`, [id]);
        if (CLIENTS.rowCount === 0) return res.status(404).send({ message: 'User does not exist' });
        res.send(CLIENTS.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postInsertCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const CLIENTS = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
        if (CLIENTS.rowCount !== 0) return res.sendStatus(409);

        await db.query(`
        INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try {
        const CLIENTS = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);
        if (CLIENTS.rowCount > 0 && CLIENTS.rows[0].id !== Number(id)) {
            return res.status(409).send({ message: 'User already exists' });
        }

        await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
