//회원가입
export type RequestSignup = {
    loginId: string;
    password: string;
    nickname: string;
}

export type ResponseSignup = {
    success: boolean;
    code: string;
    message: string;
    data: {
        userId: number,
        nickname: string,
    } | null
}

//로그인
export type RequestSignin = {
    loginId: string;
    password: string;
}

export type ResponseSignin = {
    success: boolean;
    code: string;
    message: string;
    data: {
        userId: number,
    } | null
}