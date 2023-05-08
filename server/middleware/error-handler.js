
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 400
        res.status(statusCode).json({
            message: err.message
        })
}

module.exports = {
    errorHandler
}