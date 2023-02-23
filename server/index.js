import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './src/routes/Router.js'
import fileUpload from 'express-fileupload';
import { sequelize } from './db.js';
import { errorHandler } from './src/middleware/ErrorHandlingMiddleware.js';


dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

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