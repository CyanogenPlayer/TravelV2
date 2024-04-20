import Joi from "joi";

import {IBooking} from "../interfaces";

const JoiDate = Joi.extend(require('@joi/date'));
//TODO write messages
const bookingValidator = Joi.object<IBooking>({
    bookedSince: JoiDate.date().format('YYYY-MM-DD').greater(Date.now() - 24 * 60 * 60 * 1000).utc().required(),
    bookedTo: JoiDate.date().format('YYYY-MM-DD').greater(Joi.ref('bookedSince')).utc().required()
})

export {
    bookingValidator
}