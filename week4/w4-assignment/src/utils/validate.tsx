import {SIGNUP_ERROR_MESSAGE} from "../constants/ErrorMessage";

export type UserSignupInformation = {
    id: string;
    password: string;
    passwordCheck: string;
    nickname: string;
}

// 단계별 유효성 검사 
export const validateSignup = (values: UserSignupInformation, step: number) => {
    const errors = {
        id: "",
        password: "",
        passwordCheck: "",
        nickname: "",
    };

    if (step === 1) {
        if (!values.id) {
            errors.id = SIGNUP_ERROR_MESSAGE.id.required;
        } else if (!/^[A-Za-z0-9]{8,20}$/.test(values.id)) {
            errors.id = SIGNUP_ERROR_MESSAGE.id.invalid;
        }
    }

    if (step === 2) {
        if (!values.password) {
            errors.password = SIGNUP_ERROR_MESSAGE.password.required;
        } else if (!/^[A-Za-z0-9]{8,20}$/.test(values.password)) {
            errors.password = SIGNUP_ERROR_MESSAGE.password.invalid;
        }

        if (values.password !== values.passwordCheck) {
            errors.passwordCheck = SIGNUP_ERROR_MESSAGE.passwordCheck.mismatch;
        }
    }

    if (step === 3) {
        if (!values.nickname) {
            errors.nickname = SIGNUP_ERROR_MESSAGE.nickname.required;
        } else if (!/^[가-힣a-zA-Z0-9]{1,20}$/.test(values.nickname)) {
            errors.nickname = SIGNUP_ERROR_MESSAGE.nickname.invalid;
        }
    }

    return errors;
};