
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 400

    res.status(statusCode)

    if (err.name === 'ValidationError' && err.errors) {
        const errors = {}

        Object.keys(err.errors).forEach(key => {
            errors[key] = err.errors[key].message;
        });

        res.status(statusCode).json({
            errors
        })
    } else {
        res.status(statusCode).json({
            message: err.message
        })
    }
}

module.exports = {
    errorHandler
}