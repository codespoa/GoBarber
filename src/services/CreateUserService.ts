import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from './../models/User';

interface RequestDTO {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({ name, email, password }: RequestDTO): Promise<User> {
       const usersRepository = getRepository(User)

        const checkUserExists = await usersRepository.findOne({
           where: { email: email }
        })

        if(checkUserExists) {
            throw new Error('Esse usuário já está em uso!')
        }

        const passwordHashed = await hash(password, 8)

        const user = usersRepository.create({
            name: name,
            email: email,
            password: passwordHashed
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService