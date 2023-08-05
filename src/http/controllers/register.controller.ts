import { Request, Response } from "express";
import { z, ZodError } from 'zod'

import { MakeRegister } from '../../commands/factories/make-register'

export async function RegisterController(req: Request, res: Response) {

    try {
        const RegisterSchema = z.object({
            username: z.string(),
            email: z.string()
                .nonempty('Email é necessário')
                .email('Formato inválido de Email')
                .toLowerCase()
                .refine(email => {
                    return email.endsWith('@gmail.com') || email.endsWith('@outlook.com')
                }),
            password: z.string()
                .min(6)
                .max(30),
        })

        const { username, email, password } = RegisterSchema.parse(req.body)

        const makeRegister = MakeRegister()

        await makeRegister.execute({ 
            username: username, 
            email: email, 
            password: password 
        }).then(() => {
            res.status(201).json({ message: "Usuário criado com sucesso!" })
        })


    } catch (err) {
        if (err instanceof ZodError) return res.status(400).json({ message: "Erro ao tentar criar usuário" + err })
        
        throw err
    }


}