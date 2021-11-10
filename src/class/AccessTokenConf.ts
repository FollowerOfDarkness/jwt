import { JwtPayload, verify as jwtVerify } from "jsonwebtoken"

export default class AccessTokenConf {
  private token?: string
  private playload?: JwtPayload
  private secret: string

  constructor(data: string | JwtPayload, config: { secret: string }) {
    this.secret = config.secret
    if (typeof data === "string") {
      this.token = data
    } else if (typeof data === "object") {
      this.playload = data
    } else {
      throw new Error("This data type is not supported")
    }
  }

  verify(fingerprintHash?: string) {
    const token = this.token
    if (!token) {
      throw new Error(
        "This instance must be created with a token or the token must be generated first"
      )
    }
    const playload = jwtVerify(token, this.secret)
    if (typeof playload === "string") {
      throw new Error('The header must be set to "typ": "JWT"')
    }

    if (
      fingerprintHash != undefined &&
      fingerprintHash != playload.fingerprint
    ) {
      throw new Error("The fingerprint does not match")
    }

    this.playload = playload

    return this
  }

  // genToken({}) {

  // }

  getToken() {
    if (this.token) {
      return this.token
    } else {
      throw new Error(
        "This instance must be created with a token or the token must be generated first"
      )
    }
  }

  getPlayload() {
    if (this.playload) {
      return this.playload
    } else {
      throw new Error(
        "This instance must be created with a playload or the token must be verify or decode first"
      )
    }
  }
}
