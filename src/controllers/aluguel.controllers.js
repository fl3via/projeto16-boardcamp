/*import{ db }from '../database/database.connection.js'
//import { aluguelSchema } from '../schemas/schemas.aluguel'



// FUNÇÕES DE ALUGUEIS 
export async function getListarAlugueis(req, res) {
    try {
        const { rows: rentals }= await db.query(`SELECT rentals.*, customers.name AS "customersName", games.name AS "gameName" FROM rentals
        JOIN customers ON rentals. "customerId" = customers.id
        JOIN games ON rentals. "gameId" = games.id;`)

        const result = rentals.map((rental) => {

            const rentalResponse = {
                ...rental,
                customers: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName
                }
            }
            delete rentalResponse.customerName
            delete rentalResponse.gameName
           return rentalResponse
        })

        res.send(result)
    } catch (err) {
        res.status(500).send(err.message)
    }

}


export async function postInserirAluguel(req, res) {
    const { customerId, gameId, daysRented } = req.body

    const validation = aluguelSchema.validate(req.body, {abortEarly: false})

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    try {
        

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

*/