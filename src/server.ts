/** Depedências Node e Dependências externas; */
import "dotenv/config"
import { Server, createServer } from 'http'
import { server as ServerHost } from '../server.config.json'
import { app } from './app'


/** @Host config e @Port */
const host = String(ServerHost.host)
const port = Number(ServerHost.port)

try {
    /** Tenta criar uma conexão para o servidor */
    const server: Server = createServer(app)
    server.listen(port, host, () => {
        console.log(`Ouvindo servidor na porta: ${ServerHost.port}`) //If success, show the port.
    })

} catch (err) { // Caso haja erro, será retornado aqui.
    if(err instanceof ServerError) throw new ServerError() 
}
