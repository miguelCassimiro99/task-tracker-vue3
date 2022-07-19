import axios, { AxiosInstance } from "axios"

const clientHttp: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
})

export default clientHttp
