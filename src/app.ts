import express from 'express'
import config from 'config'
import create_connection from './db'
import log from './log'
import app_route from './routes'
import { deserialize_user } from './middleware/user_validation'

const app = express()

app.use(express.json())
app.use(deserialize_user)

let [port, mongo_db] = [config.get<string>('port'), config.get('mongoDb')]

app.listen(port, async () => { 
    log.info(`🚀 Server is running at http://localhost:${port}`);
    
    //  Create Connection to Mongo DB database
    await create_connection();

    // Initialise Routes 
    app_route(app)


})