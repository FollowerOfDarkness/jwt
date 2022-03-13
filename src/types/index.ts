import { JwtPayload } from "jsonwebtoken"

export interface ActualPayload {
    [key: string]: any
}

export interface UtilityPayload {
    iat: number,
    exp: number,
    fingerprint: string
}

export type AllPayload = ActualPayload & UtilityPayload
