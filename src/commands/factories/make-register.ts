import { RegisterCommand } from '../register.command'
import { UserRepository } from '../../repositories/in-memory/in-memory-users-repository'

export function MakeRegister() {
    const userRepository = new UserRepository()
    const registerCommand = new RegisterCommand(userRepository)

    return registerCommand
}