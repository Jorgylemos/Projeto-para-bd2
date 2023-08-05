// Crio uma função para "hashar" a senha dos usuários recém criados
import { createHash } from 'crypto'

export async function PasswordHash(password: string) {

    const pwdHash = createHash('sha256', { 
        encoding: 'hex', 
    })
    .update(password)
    .digest('hex')
    
    return pwdHash
}