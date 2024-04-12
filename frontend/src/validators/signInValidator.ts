import Joi from "joi";

const signInValidator = Joi.object({
    username: Joi.string().required().messages({
        'any.required': `username is a required field`
    }),
    password: Joi.string().required().messages({
        'any.required': `password is a required field`
    })
})

export {
    signInValidator
}