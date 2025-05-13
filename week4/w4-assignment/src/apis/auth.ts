import type { RequestSignup, RequestSignin, ResponseSignin, ResponseSignup } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async(body: RequestSignup):Promise<ResponseSignup> => {
    const {data} = await axiosInstance.post('/api/v1/auth/signup', body);

    return data;
}

export const postSignin = async(body: RequestSignin):Promise<ResponseSignin> => {
    const {data} = await axiosInstance.post('/api/v1/auth/signin', body);

    return data;
}