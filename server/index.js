import express from 'express';
import { sequelize } from './db.js';
import models from './models/models.js';
import cors from 'cors';
import router from './routes/Router.js'
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
    } catch (e) {
        console.log(e);
    }

}

start();