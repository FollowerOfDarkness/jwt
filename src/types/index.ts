import { JwtPayload } from "jsonwebtoken"

export declare class AccessTokenType {
  constructor(data: string | JwtPayload)
  verify(): this
  getToken(): string
  getPlayload(): AllPayload
}

export interface ActualPayload {
    id: number,
    role: number
}

export interface UtilityPayload {
    iat: number,
    exp: number,
    fingerprint: string
}

export type AllPayload = ActualPayload & UtilityPayload
