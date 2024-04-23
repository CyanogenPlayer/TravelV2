import {JWTPayload} from "jose";

import {ERole} from "../enums";

export type JwtType = JWTPayload & {
    roles?: ERole[]
}