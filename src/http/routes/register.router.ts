import { Router, IRouter } from 'express'
import { RegisterController } from '../controllers/register.controller'
import { UserRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { Request, Response } from 'express'

const router: IRouter = Router()

async function DeleteUser(req: Request, res: Response) {
    const { email } = req.body

    const emailDeleted = await new UserRepository().DeleteUser(
        email
    )

    res.status(200).json({ message: "Usuário deletado com sucesso", userData: emailDeleted })
}

async function UpdateUser(req: Request, res: Response) {
    const { email, username, newEmail, password } = req.body
    const updateUser = await new UserRepository().UpdateUser(
        email,
        username,
        newEmail,
        password
    )

    res.status(200).json({ message: "Dados do usuário atualizado com sucesso", userData: updateUser })
}

async function GetUsers(req: Request, res: Response) {
    const users = await new UserRepository().getAllUsers()
    res.status(200).json({ users: users })
}

router.get('/user', GetUsers)
router.post('/user', RegisterController)
router.post('/user/update', UpdateUser)
router.post('/user/delete', DeleteUser)

export { router as RegisterRoute }