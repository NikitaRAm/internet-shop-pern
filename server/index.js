import express from 'express';
import { sequelize } from './db.js';
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
    } catch (e) {
        console.log(e);
    }

}

start()