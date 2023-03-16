import ApiError from '../errors/ApiError.js';
import { User, Basket } from '../models/models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class UserController { 
    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if(!email || !password) return next(ApiError.baqRequest('incorrect email or password'));
        const candidate = await User.findOne({where: {email}});
        if(candidate) return next(ApiError.baqRequest('User with this email already exists'));
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json(token);
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) return next(ApiError.baqRequest('User with this email not found'));
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) return next(ApiError.baqRequest('Incorrect password'));
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }
}

const userController = new UserController();

export default userController;