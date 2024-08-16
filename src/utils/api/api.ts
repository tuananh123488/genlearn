import axios from "axios";
import Cookies from 'js-cookie';
axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.baseURL = 'https://qilearn-be.vercel.app'

export enum TypeHTTP {
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    GET = 'get'
}

export interface APIType {
    path: string
    body?: any
    type: TypeHTTP
}

export const api = ({ path, body, type }: APIType) => {
    const user_id = Cookies.get('user_id')
    // const accessToken = Cookies.get('accessToken')
    // const refreshToken = Cookies.get('refreshToken')
    const accessToken = globalThis.window.localStorage.getItem('accessToken')
    const refreshToken = globalThis.window.localStorage.getItem('refreshToken')
    return new Promise((rejects, resolve) => {
        switch (type) {
            case TypeHTTP.GET:
                axios.get(path, { headers: { accessToken, refreshToken } })
                    .then(res => {
                        rejects(res.data as any)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
            case TypeHTTP.POST:
                axios.post(path, body, { headers: { accessToken, refreshToken } })
                    .then(res => {
                        rejects(res.data as any)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
            case TypeHTTP.PUT:
                axios.put(path, body, { headers: { accessToken, refreshToken } })
                    .then(res => {
                        rejects(res.data as any)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
            case TypeHTTP.DELETE:
                axios.delete(path, { headers: { accessToken, refreshToken } })
                    .then(res => {
                        rejects(res.data as any)
                    })
                    .catch(res => {
                        resolve({ status: res.response?.status, message: res.response?.data.message })
                    })
                break
        }
    })
}