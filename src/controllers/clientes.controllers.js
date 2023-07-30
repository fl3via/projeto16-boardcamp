import { db } from '../database/database.connection.js'

//  FUNÇÕES DE CLIENTES

export async function getListaTodosClientes(req, res) {
    try {
        const clientes = await db.query(`SELECT * FROM customers;`)
        res.send(clientes.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// Busca o cliente pelo id
export async function getBuscarClienteId(req, res) {
    const { id } = req.params
    try {
        const clientes = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])
        if (clientes.rowCount === 0) return res.status(404).send({ message: 'Usuário não existe' })
        res.send(clientes.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// Criar clientes
export async function postInserirClientes(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const clientes = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if (clientes.rowCount !== 0) return res.sendStatus(409)

        await db.query(`
        INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


export async function putAtualizarCliente(req, res) {
    const { id } = req.params
    const { name, phone, cpf, birthday } = req.body

    try {
        const clientes = await db.query(`SELECT * FROM customers WHERE id = $1`, [cpf])

        if (clientes.rowCount > 0 && clientes.rows[0].id === Number(id)) {
            return res.status(409).send({ message: 'Usuário já existe' })
        } else {
            await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, id])
            res.sendStatus(200)
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}


