import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgressUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

const postgressUserRepository = new PostgressUserRepository()

const mailtrapProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUseCase (
    postgressUserRepository,
    mailtrapProvider,
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }