import Joi from "joi";

import {SignInRequest} from "../interfaces";

const signInValidator = Joi.object<SignInRequest>({
    username: Joi.string().required().messages({
        'string.empty': `username cannot be an empty`,
        'any.required': `username is a required field`
    }),
    password: Joi.string().required().messages({
        'string.empty': `password cannot be an empty`,
        'any.required': `password is a required field`
    })
})

export {
    signInValidator
}