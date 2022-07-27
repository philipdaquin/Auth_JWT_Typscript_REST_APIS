import mongoose from "mongoose";
import config from 'config';
import log from './log'

// Establish Connection to Mongo Db 
async function create_connection() { 
    let db_options = { 
        socketTimeoutMS : 50000,
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 50000,
        autoIndex: true
    };
    let mongo_db_host = config.get<string>('mongoDb');

    try {
            await mongoose.connect(mongo_db_host, db_options)
            log.info(`Connected to MongoDb Client at ${mongo_db_host}`)
        } catch (error) {
            log.error(`Failed to establish MongoDb client due to : ${error}`)
        }
}


export default create_connection
