import { JwtPayload } from "jsonwebtoken"

export declare class AccessTokenType {
  constructor(data: string | JwtPayload)
  verify(): this
  getToken(): string
  getPlayload(): JwtPayload
}