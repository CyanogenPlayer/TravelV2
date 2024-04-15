import Joi from "joi";

import {IBooking} from "../interfaces";

const JoiDate = Joi.extend(require('@joi/date'));

const bookingValidator = Joi.object<IBooking>({
    bookedSince: JoiDate.date().format('YYYY-MM-DD').greater('now').utc().required(),
    bookedTo: JoiDate.date().format('YYYY-MM-DD').greater(Joi.ref('bookedSince')).utc().required()
})

export {
    bookingValidator
}