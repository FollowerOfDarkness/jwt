import { JwtPayload } from "jsonwebtoken"
import AccessTokenConf from "./class/AccessTokenConf"
import GetAxios from "./class/GetAxios";
import { AccessTokenType } from './types';

function jwtInit(options: { secret: string }) {
  class AccessToken extends AccessTokenConf {
    constructor(data: string | JwtPayload) {
      super(data, { secret: options.secret })
    }
  }

  return { AccessToken: <typeof AccessTokenType>AccessToken }
}

export { GetAxios, jwtInit }
