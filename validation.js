const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const registerSchma = Joi.object({
        firstName: Joi.string().required().min(2).max(15),
        lastName: Joi.string().required().min(2).max(15),
        age: Joi.number().required().min(16).max(70),
        gender: Joi.string().required().min(4).max(6),
        position: Joi.string().required().min(2).max(100),
        country: Joi.string().required().min(2).max(20),
        address: Joi.string().min(10).max(150).required(),
        email: Joi.string().required().min(5).max(150),
        username: Joi.string().required().min(4).max(20),
        password: Joi.string().required().min(6).max(50),
        phone: Joi.string().required().min(10).max(15),
        picture: Joi.any().allow('').optional()
    });
    return registerSchma.validate(data);
}

const loginValidation = (data) => {
    const loginSchema = Joi.object({
        username: Joi.string().required().min(4).max(20),
        password: Joi.string().required().min(6).max(50)
    });
    return loginSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation