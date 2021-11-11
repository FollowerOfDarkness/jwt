import { JwtPayload } from "jsonwebtoken"
import AccessTokenConf from "./class/AccessTokenConf"
import { AccessTokenGenAllow, AccessTokenType } from './types/index';

export default function jwtInit(options: { secret: string, expires: number}): { AccessToken: typeof AccessTokenGenAllow }
export default function jwtInit(options: { secret: string}): { AccessToken: typeof AccessTokenType }

export default function jwtInit(options: { secret: string, expires?: number}) {
  class AccessToken extends AccessTokenConf {
    constructor(data: string | JwtPayload) {
      super(data, { secret: options.secret, expires: options.expires})
    }
  }

  return { AccessToken }
}
