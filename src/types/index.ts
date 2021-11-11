import { JwtPayload } from "jsonwebtoken"

export declare class AccessTokenType {
  constructor(data: string | JwtPayload )
  verify(fingerprintHash?: string): this
  getToken(): string
  getPlayload(): JwtPayload
}

export declare class AccessTokenGenAllow extends AccessTokenType {
  genToken(fingerprintHash?: string): this
}