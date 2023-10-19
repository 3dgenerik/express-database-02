import client from "../database";
import bcrypt from 'bcrypt';
import { SALT_ROUND } from "../config";


export interface IUser{
    id?:number
    username: string
    password: string
}

export class UsersStore {

    private async createHash(password: string):Promise<string>{
        const hash = await bcrypt.hash(password, parseInt(SALT_ROUND!))
        return hash
    }

    async compareHash(password: string, hash: string): Promise<boolean>{
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch;
    }

    async userExist(username: string):Promise<boolean>{
        const allUsers = await this.getAllUsers()
        for (const user of allUsers) {
            if(user.username===username)
                return true;
        }
        return false;

    }

    async getAllUsers():Promise<IUser[]>{
        const conn = await client.connect()
        const sql = 'SELECT * FROM users';
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    }

    async createUser(user: IUser):Promise<IUser>{
        const conn = await client.connect()
        const sql = 'INSERT INTO users (username, password_hash) VALUES($1, $2) RETURNING *';
        const hash = await this.createHash(user.password)

        const result = await conn.query(sql, [user.username, hash])
        conn.release()
        return result.rows[0]
    }

    async authUser(user:IUser):Promise<IUser | null>{

        const userExist = await this.userExist(user.username)

        if(!userExist)
            return null;

        const conn = await client.connect()
        const sql = 'SELECT * from users WHERE username = ($1)';
        const result = await conn.query(sql, [user.username])
        conn.release()
        const dbUser = result.rows[0]

        const isMatch = await this.compareHash(user.password, dbUser.password_hash)

        if(!isMatch)
            return null;
        return {
            id:dbUser.id,
            username: dbUser.username,
            password: dbUser.password_hash
        }
    }
}

