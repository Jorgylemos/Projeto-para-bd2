// Este erro será retorno no server.ts
class ServerError extends Error {
    constructor() {
        super("Um erro ocorreu ao tentar iniciar o servidor.")
    }
}