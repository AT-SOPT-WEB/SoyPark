import type { ResponseSearch } from "../types/search";
import { axiosInstance } from "./axios";

export const searchInfo = async(keyword:string): Promise<ResponseSearch> => {
    const {data} = await axiosInstance.get('/api/v1/users', {
        params: keyword ? { keyword } : undefined,
    });

    return data;
}
