import { LOCAL_STORAGE_KEY } from "../constants/key";
import type { RequestSignup, RequestSignin, ResponseSignin, ResponseSignup, ResponseMyInfo, PatchMyNicname } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async(body: RequestSignup):Promise<ResponseSignup> => {
    const {data} = await axiosInstance.post('/api/v1/auth/signup', body);

    return data;
}

export const postSignin = async(body: RequestSignin):Promise<ResponseSignin> => {
    const {data} = await axiosInstance.post('/api/v1/auth/signin', body);

    return data;
}

const userID = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken); 

export const getMyInfo = async(): Promise<ResponseMyInfo> => {
    const {data} = await axiosInstance.get('/api/v1/users/me', {
        headers: {
            userId: Number(userID),
        }
    });

    return data;
}


export const patchNicname = async(nickname: string): Promise<PatchMyNicname> => {
    const {data} = await axiosInstance.patch('/api/v1/users', { nickname }, {
        headers: {
            userId: Number(userID),
        }
    });

    return data;
}
