import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export default function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({message: 'User not authorized'});
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(e) {
        res.status(401).json({message: 'User not authorized'})
    }
}