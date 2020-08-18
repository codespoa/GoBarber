import express from 'express'
import routes from './routes/index';
import './database'

const app = express()

app.use(express.json())
app.use(routes)

app.get('/', (request, response) => {
    return response.json({message: 'Testando'})
})

app.listen(3333, () => {
    console.log('Rodando')
})