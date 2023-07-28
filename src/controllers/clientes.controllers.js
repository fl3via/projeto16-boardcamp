//  FUNÇÕES DE CLIENTES

export async function getListaTodosClientes(req, res) {
    const clientes = await db.query(`SELECT * FROM clientes;`)
    res.send(clientes.rows)
}

export async function getBuscarClienteId(req, res) {
    const { id } = req.params
    try {
        const clientes = await db.query(`SELECT * FROM clientes WHERE id = $1;`, [id])
        res.send(clientes.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function putAtualizarCliente(req, res) {

}