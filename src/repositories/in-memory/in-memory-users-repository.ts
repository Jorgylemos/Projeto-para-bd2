import { IUserRepository, IUser } from "../interfaces/IUserRepository";
import { MongoDBConnection } from "../../database/config";
import { ConnectDB } from '../../../server.config.json'
import { Collection, UpdateFilter } from "mongodb";
import { PasswordHash } from "../../utils/PasswordHash";

type UserSummary = Pick<IUser, 'email'>

export class UserRepository extends MongoDBConnection implements IUserRepository {

    // Faz a busca pelo email
    async findByEmail (email: string) {
        await this.connect() // Espera a conexão com o mongo

        if (!this.client) { // Caso a conexão seja inválida
            throw new Error('Conexão com MongoDB não foi estabelecido.');
        }

        // Aqui,é feita a busca pelo DB e Collection pré definidos
        const MongoConnect: Collection<IUser> = this.client.db(ConnectDB.db).collection(ConnectDB.collection)

        // Procura o email
        const findEmail = await MongoConnect.findOne<UserSummary>({
            email: email
        })

        return findEmail

    }

    async getAllUsers() {
        await this.connect()

        if (!this.client) { // Caso a conexão seja inválida
            throw new Error('Conexão com MongoDB não foi estabelecido.');
        }

        const MongoConnect: Collection<IUser> = this.client.db(ConnectDB.db).collection(ConnectDB.collection)

        // Procura o email
        const allUsers = await MongoConnect.find({}).toArray()

        return allUsers
    }

    async UpdateUser(email: string, username: string, newEmail: string, password: string) {
        await this.connect()
        if (!this.client) { // Caso a conexão seja inválida
            throw new Error('Conexão com MongoDB não foi estabelecido.');
        }

        const MongoConnect: Collection<IUser> = this.client.db(ConnectDB.db).collection(ConnectDB.collection)

        const filter: UpdateFilter<IUser> = { email }
        const update: UpdateFilter<IUser> = { }

        if(username) {
            update.$set = { ...update.$set, username }            
        }

        if(newEmail) {
            update.$set = { ...update.$set, email: newEmail }
        }

        if(password) {
            const hashPwd = await PasswordHash(password)
            update.$set = { ...update.$set, password: hashPwd }
        }

        if(Object.keys(update).length === 0) {
            return { success: false }
        }

        const updatedUser = await MongoConnect.updateOne(filter, update)

        console.log("Usuário atualizado")

        return updatedUser

    }

    async DeleteUser(email: string) {
        await this.connect()
        if (!this.client) { // Caso a conexão seja inválida
            throw new Error('Conexão com MongoDB não foi estabelecido.');
        }

        const MongoConnect: Collection<IUser> = this.client.db(ConnectDB.db).collection(ConnectDB.collection)

        const filter: UpdateFilter<IUser> = { email }

        const deletedUser = await MongoConnect.deleteOne(filter)
      
        console.log("Usuário deletado")

        return deletedUser

    }

    // Cria um novo usuário
    async create({ username, email, password }: IUser) {
        await this.connect()

        if (!this.client) {
            throw new Error('Conexão com MongoDB não foi estabelecido.');
        }
        const MongoConnect = this.client.db(ConnectDB.db).collection(ConnectDB.collection)

        const currentDate = new Date()
        const expireDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())

        const DocumentInserted = await MongoConnect.insertOne({ 
            username: username, 
            email: email, 
            password: password, 
            Payment: {
                paymentStatus: true,
                accessStatus: true,
                expireDate: expireDate
            },
            Advantages: {
                movies: true,
                series: true,
                premium: true
            }
        })
        .then(async () => {
            await this.closed()
        })

        return DocumentInserted
    }
}