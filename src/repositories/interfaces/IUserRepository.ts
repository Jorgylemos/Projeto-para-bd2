export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface IUserRepository {
    findByEmail: (email: string) => Promise<any>
    create: ({ username, email, password }: IUser) => Promise<void>
}