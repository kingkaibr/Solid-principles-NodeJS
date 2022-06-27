import { User } from "../../entities/users";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./createUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProdvider: IMailProvider,
    ){}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProdvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'App',
                email: 'app.meuapp@meuapp.com',
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p> Você já pode fazer login em nossa plataforma. </p>'
        })
    }
}