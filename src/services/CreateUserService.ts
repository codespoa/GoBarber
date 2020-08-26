import { getRepository } from 'typeorm'

import User from './../models/User';

interface RequestDTO {
    name: String
    email: String
    password: String
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

        const user = usersRepository.create({
            name: name,
            email: email,
            password: password
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService