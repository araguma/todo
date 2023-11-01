import { Document, MongoClient } from 'mongodb';

if(!process.env.URI) throw new Error('URI not found in environment variables');

const client = new MongoClient(process.env.URI);
const database = client.db('todo');

client.connect();

export default class Model {
    static create<T extends Document>(name: string) {
        return class {
            static collection = database.collection<T>(name);
        }
    }
}