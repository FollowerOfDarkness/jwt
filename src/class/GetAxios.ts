import axios from "axios"
import { ActualPayload, AllPayload } from "../types"

/**
 * @class
 * Класс отвечает за аутентефикацию и предоставляет экземпляр класса axios-а с установленными заголовками
 */
export default class GetAxios {

    private static instance: GetAxios

    /**Получить экземпляр класса, реализация синглтона*/
    static getInstance(authServerUrl: string, serverUrl: string) {
        if (!this.instance) {
            this.instance = new GetAxios(authServerUrl, serverUrl)
        }
        return this.instance
    }

    private axiosServer
    private axiosAuthServer
    private payload: null | AllPayload = null

    private constructor(authServerUrl: string, serverUrl: string) {
        this.axiosServer = axios.create({
            baseURL: serverUrl,
        })
        this.axiosAuthServer = axios.create({
            baseURL: authServerUrl,
            withCredentials: true,
        })

    }

    /**Отчистить access token*/
    private clearAccessToken() {
        this.payload = null
        delete this.axiosServer.defaults.headers.common["Authorization"]
    }

    /**Отчистить аутентификационные данные (logout) */
    async logout() {
        await this.axiosAuthServer.post("/logout")
        this.clearAccessToken()
    }

    /**Получить аутентификационные данные (login)*/
    async login(email: string, pass: string) {
        const serverResonse = await this.axiosAuthServer.post<{ access_token: string } | undefined>("/login", { email, pass })
        const token = serverResonse?.data?.access_token
        this.clearAccessToken()
        this.setToken(token)
    }

    /**Декодируем токен в объект*/
    private decodeToken(token: unknown): AllPayload | null {
        if (typeof token === "string") {
            const payloadBase64 = token.match(/(?<=[.]).*(?=[.])/gi)?.[0]
            try {
                const encodeToken = payloadBase64 && Buffer.from(payloadBase64, "base64").toString()
                let payload: AllPayload | undefined
                payload = encodeToken && JSON.parse(encodeToken)
                if (typeof payload === "object" && payload.exp && payload.iat &&  payload.fingerprint) {
                    return payload
                }
            } catch { }
        }
        return null
    }

    /**Установить токен в хедер*/
    private setToken(token: unknown) {
        const payload = this.decodeToken(token)
        if(typeof token === "string" && payload) {
            this.payload = payload
            this.axiosServer.defaults.headers.common["Authorization"] = token
            return void 0
        }
        throw new Error("invalid access token")
    }

    /**Обновить access токен*/
    private async refrash() {
        this.clearAccessToken()
        const serverResonse = await this.axiosAuthServer.get("/refresh")
        this.setToken(serverResonse?.data?.access_token)
    }

    /**Проверяем время жизни токена, если время вышло то пытаемся обновить access токен*/
    private async checkExpTryRefrash() {
        if (this.payload?.exp ?? 0 * 1000 + 1000 < new Date().getTime()) {
            await this.refrash()
        }
    }

    /**Получить payload access токена*/
    async getPayload(): Promise<ActualPayload> {
        await this.checkExpTryRefrash()
        const { exp, iat, fingerprint, ...payload } = <AllPayload>this.payload
        return payload
    }

    /**Получить экземпляр axios уже содержаший данные для аутентефикации*/
    async getAxios() {
        await this.checkExpTryRefrash()
        return this.axiosServer
    }


}
