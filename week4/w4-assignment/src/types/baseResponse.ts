export interface BaseResponse<T = null> {
    success: boolean;
    code: string;
    message: string;
    data: T;
}