import dotenv from 'dotenv';
import mongoose, { Connection, Model, Schema } from 'mongoose';

dotenv.config();

export class MongoDbProvider {
    private dbConnection: Connection | null;

    constructor() {
        this.dbConnection = null;
    }

    private connect(): Connection {
        console.log('Connecting to DB...');
        return mongoose.createConnection(`${process.env.MONGODB_URL}/${process.env.MONGODB_DB_NAME}`, {
            ssl: true,
            auth: {
                username: process.env.MONGODB_USER,
                password: process.env.MONGODB_PASSWORD,
            },
            retryWrites: true,
            w: 'majority',
        });
    }

    public getMongoConnection(): Connection {
        if (!this.dbConnection || this.dbConnection.readyState !== 1) {
            this.dbConnection = this.connect();
        }
        return this.dbConnection;
    }

    public closeConnection(connection: Connection): void {
        connection.close();
    }

    public getModel<T>(modelName: string, schema: Schema): Model<T> {
        return this.getMongoConnection().model<T>(modelName, schema);
    }
}

export const mongoDbProvider = new MongoDbProvider();
