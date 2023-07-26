import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(rotasRouter)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`))