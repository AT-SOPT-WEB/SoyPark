import type { BaseResponse } from "./baseResponse";

//회원가입
export type RequestSignup = {
    loginId: string;
    password: string;
    nickname: string;
}

export type ResponseSignup = BaseResponse<{
    userId: number;
    nickname: string;
}>;

//로그인
export type RequestSignin = {
    loginId: string;
    password: string;
}

export type ResponseSignin = BaseResponse<{
    userId: number;
}>;

// 내 정보 조회
export type ResponseMyInfo = BaseResponse<{
    nickname: string;
}>;

// 닉네임 수정
export type PatchMyNickname = BaseResponse<null>;