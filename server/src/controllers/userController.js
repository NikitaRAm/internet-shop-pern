import ApiError from "../errors/ApiError.js";
import { errorHandler } from "../middleware/ErrorHandlingMiddleware.js";

class UserController { 
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const { id } = req.query;
        if(!id) return next(ApiError.baqRequest('id not set'));
        res.json(id);
    }
}

const userController = new UserController();

export default userController;