export class EmailAlreadyExists extends Error {
    constructor() {
        super("Email já existe.")
    }
}