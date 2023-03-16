export default class ApiError extends Error {
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }

    static baqRequest(message) {
        return new ApiError(404, message);
    }
    
    static ineternal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

}