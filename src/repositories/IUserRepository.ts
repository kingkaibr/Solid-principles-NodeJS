import { User } from "../entities/users";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
}