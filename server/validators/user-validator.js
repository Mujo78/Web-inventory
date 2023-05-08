const {check} = require("express-validator")
const {
   POST_PASSWORD_LOGIN,
   POST_USERNAME_LOGIN,
   POST_USERNAME_MAX_LENGTH,
} = require("../constants/user-constants")

exports.loginUserValidator = [
    check("username")
        .notEmpty()
        .withMessage(POST_USERNAME_LOGIN)
        .isLength({max: 100})
        .withMessage(POST_USERNAME_MAX_LENGTH)
        .bail(),
    check("password")
        .notEmpty()
        .withMessage(POST_PASSWORD_LOGIN)
        .bail()

]