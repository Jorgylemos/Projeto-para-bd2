import { MongoClient, ServerApiVersion } from 'mongodb'
import { ConnectDB } from '../../server.config.json'

export class MongoDBConnection {

    public readonly DBKey: string = String(ConnectDB.url)
    public client: MongoClient | null = null

    async connect(): Promise<void> {
        try {
            this.client = new MongoClient(this.DBKey, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true
                }
            })
            await this.client.connect()
            console.log("Conexão com MongoDB estabelecida.")
        } catch (err) {
            if (err) throw new Error("Ocorreu um erro ao tentar conectar ao MongoDB.")
            throw err;
        }
    }

    async closed(): Promise<void> {
        if (this.client) {
            await this.client.close()
            console.log("Conexão com MongoDB fechada")
        }
    }
}