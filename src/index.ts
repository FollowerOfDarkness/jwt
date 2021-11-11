import { JwtPayload } from "jsonwebtoken"
import AccessTokenConf from "./class/AccessTokenConf"
import { AccessTokenType } from './types';

export default function jwtInit(options: { secret: string, expires: number}) {
  class AccessToken extends AccessTokenConf {
    constructor(data: string | JwtPayload) {
      super(data, { secret: options.secret, expires: options.expires})
    }
  }

  return { AccessToken: <typeof AccessTokenType>AccessToken }
}
