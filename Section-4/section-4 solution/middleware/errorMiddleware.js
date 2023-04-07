const debug = require('debug')('app:errorMiddleware');


module.exports = function (error, req, res, next) {
    debug(error);
    const response = { data: null, message: null, error: null };
    response.message = error.message;
    response.error = error.name;
    res.status(500).send(response);
}