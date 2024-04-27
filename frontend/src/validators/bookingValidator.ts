import Joi from "joi";

import {IBooking} from "../interfaces";

const JoiDate = Joi.extend(require('@joi/date'));
const bookingValidator = Joi.object<IBooking>({
    bookedSince: JoiDate.date().format('YYYY-MM-DD').greater(Date.now() - 24 * 60 * 60 * 1000).utc().required()
        .messages({
            'date.format': 'booked since date must be in YYYY-MM-DD format',
            'date.greater': 'booked since date must be equal to or greater than today date',
            'any.required': 'booked since date is a required field'
        }),
    bookedTo: JoiDate.date().format('YYYY-MM-DD').greater(Joi.ref('bookedSince')).utc().required()
        .messages({
            'date.format': 'booked to date must be in YYYY-MM-DD format',
            'date.greater': 'booked to date must be greater than booked since date',
            'any.required': 'booked to date is a required field'
        })
})

export {
    bookingValidator
}