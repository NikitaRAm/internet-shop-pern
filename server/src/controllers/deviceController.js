import * as uuid from 'uuid';
import path from 'path';
import { Device, DeviceInfo } from '../models/models.js';
import ApiError from '../errors/ApiError.js';

class DeviceController { 
    async create(req, res, next) {
        try{
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + '.jpg';
            img.mv(path.resolve('src', 'static', filename));
            const device = await Device.create({name, price, brandId, typeId, img: filename});

            if(info) {
                info = JSON.parse(info);
                info.forEach(info => {
                    DeviceInfo.create({
                        title: info.title,
                        description: info.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device);

        } catch (e) {
            next(ApiError.baqRequest(e.message));
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page, info} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let devices;

        !brandId && !typeId ? devices = await Device.findAndCountAll({limit, offset}) :
        brandId && !typeId ?  devices = await Device.findAndCountAll({where: {brandId, limit, offset}}) :
        !brandId && typeId ? devices = await Device.findAndCountAll({where: {typeId, limit, offset}}) :
        brandId && typeId ? devices = await Device.findAndCountAll({where: {typeId, brandId, limit, offset}}) : null;

        res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device);
    }

}

const deviceController = new DeviceController();

export default deviceController;