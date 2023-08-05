import { IRegisterDTO } from './dto/RegisterDTO'
import { UserRepository } from '../repositories/in-memory/in-memory-users-repository'
import { PasswordHash } from '../utils/PasswordHash'
import { EmailAlreadyExists } from './errors/EmailAlreadyExists'

export class RegisterCommand {

    constructor(private userRepository: UserRepository) { }

    async execute({ username, email, password }: IRegisterDTO) {

        const pwdHash = String(await PasswordHash(password))
        const emailAlreadyExists = await this.userRepository.findByEmail(email)

        if(emailAlreadyExists) {
            throw new EmailAlreadyExists()
        }

        const user = await this.userRepository.create({ 
            username, 
            email, 
            password: pwdHash 
        })
        
        return { user }
    }
}