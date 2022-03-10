import { JwtPayload } from "jsonwebtoken"

export declare class AccessTokenType {
  constructor(data: string | JwtPayload )
  verify(fingerprintHash?: string): this
  getToken(): string
  getPlayload(): AllPayload
}

export interface ActualPayload {
    [key: string]: any
}

export interface UtilityPayload {
    iat: number,
    exp: number,
    fingerprint: string
}

export type AllPayload = ActualPayload & UtilityPayload
