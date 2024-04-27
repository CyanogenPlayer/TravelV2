import Joi from "joi";

import {IRoom} from "../interfaces";

const roomValidator = Joi.object<IRoom>({
    roomNumber: Joi.number().integer().min(1).required().messages({
        'number.integer': 'room number must be integer',
        'number.min': 'room number must be equal to or greater than {#limit}',
        'any.required': 'room number is required field'
    }),
    capacity: Joi.number().integer().min(1).max(10).required().messages({
        'number.integer': 'capacity must be integer',
        'number.min': 'capacity must be equal to or greater than {#limit}',
        'number.max': 'capacity must be less than or equal to {#limit}',
        'any.required': 'capacity is required field'
    }),
    hotelId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'hotel must be in hex format',
        'string.length': 'hotel must be 24 characters long',
        'any.required': 'hotel is required field'
    })
});

export {
    roomValidator
}