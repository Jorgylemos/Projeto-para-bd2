import cors from 'cors'
import express, { Express } from 'express'
import { RegisterRoute } from './http/routes/register.router'
import path from 'path'

const app: Express = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors()) // Cors habilita o servidor para ser acessado externamente.
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})

app.use(RegisterRoute) // Aqui são passado as rotas da pasta routes

export { app }
