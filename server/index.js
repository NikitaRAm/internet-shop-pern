import express from 'express';
import { sequelize } from './db.js';
import models from './models/models.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { json } from 'sequelize';
dotenv.config()

const PORT = process.env.PORT;

const app = express();
app.use(cors())
app.use(express.json())

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