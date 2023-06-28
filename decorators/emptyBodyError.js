const {HttpError}= require("../helpers");

const emptyBodyError = (req, res, next) => {
    const data = req.body;
    if(Object.keys(data).length === 0){
        throw HttpError (400, `missing fields`)
    }
    next()
    }
    
    module.exports = emptyBodyError;