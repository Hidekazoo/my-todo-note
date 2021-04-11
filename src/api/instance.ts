import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    commonErrorHandling?: boolean;
  }
}

export const authInstance = axios.create({
  baseURL: process.env.BASE_URL,
});
