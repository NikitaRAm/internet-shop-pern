import * as uuid from 'uuid';
import path from 'path';
import { Device } from '../models/models.js'
import ApiError from '../errors/ApiError.js'

class DeviceController { 
    async create(req, res, next) {
        try{
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + '.jpg';
            img.mv(path.resolve('src', 'static', filename));
    
            const device = await Device.create({name, price, brandId, typeId, img: filename})
            return res.json(device);

        } catch (e) {
            next(ApiError.baqRequest(e.message));
        }

    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }

}

const deviceController = new DeviceController();

export default deviceController;