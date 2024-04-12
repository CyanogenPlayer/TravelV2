import Joi from "joi";

const signUpValidator = Joi.object({
    username: Joi.string().min(3).max(20).required().messages({
        'string.empty': `username cannot be an empty`,
        'string.min': `username should have a minimum length of {#limit}`,
        'string.max': `username should have a maximum length of {#limit}`,
        'any.required': `username is a required field`
    }),
    email: Joi.string().min(1).max(50).required().email({ tlds: { allow: false } }).messages({
        'string.empty': `email cannot be an empty`,
        'string.min': `email should have a minimum length of {#limit}`,
        'string.max': `email should have a maximum length of {#limit}`,
        'any.required': `email is a required field`,
        'string.email': 'not valid email'
    }),
    password: Joi.string().min(6).max(20).required().messages({
        'string.empty': `password cannot be an empty`,
        'string.min': `password should have a minimum length of {#limit}`,
        'string.max': `password should have a maximum length of {#limit}`,
        'any.required': `password is a required field`
    }),
    re_password: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': `password doesn't match`
    })
})

export {
    signUpValidator
}