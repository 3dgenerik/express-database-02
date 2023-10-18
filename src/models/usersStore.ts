import { config } from "dotenv";
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

    async userExist(){
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
}

