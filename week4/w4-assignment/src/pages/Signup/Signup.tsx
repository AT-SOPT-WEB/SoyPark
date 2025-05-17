import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Container, 
        headerText, 
        inputBox, 
        btnStyle, 
        linkStyle,
        btnActive,
        btnInactive,
    } from "../Login/LoginStyle.css"
import * as S from "./SignupStyle.css";
import useForm from "../../hooks/useForm";
import { validateSignup } from "../../utils/validate";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { postSignup } from "../../apis/auth";
import { AxiosError } from "axios";
import type { ResponseSignup } from "../../types/auth";

const SignupPage = () => {
    const navigate = useNavigate();

    // 단계별 진행 
    const [step, setStep] = useState(1);

    // 비밀번호 보이기
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const { values, errors, touched, getInputProps } = useForm({
        initialValue: {
            id: "",
            password: "",
            passwordCheck: "",
            nickname: "",
        },
        validate: validateSignup,
        step,
    });
    
    // step에 따른 조건
    const isStepValid = () => {
        if (step === 1) return !errors.id && !!values.id;
        if (step === 2) return !errors.password && !errors.passwordCheck && !!values.password && !!values.passwordCheck;
        if (step === 3) return !errors.nickname && !!values.nickname;
        return false;
    };

    const handleNext = () => {
        if (isStepValid()) setStep((prev) => prev + 1);
    };

    const handleSubmit =  async () => {
        if (isStepValid()) {
            try {
                const response = await postSignup({ 
                    loginId: values.id, 
                    password: values.password, 
                    nickname: values.nickname, 
                });

                if (response.success && response.data) {
                    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, response.data.userId.toString());
                    alert(`${values.nickname}님 반갑습니다! 회원가입에 성공했어요.`);
                    navigate("/login");

                } else {;
                    alert("회원가입 실패: " + response.message);
                }
            } catch (e) {
                const error = e as AxiosError<ResponseSignup>;
                const errorData = error.response?.data;

                if (errorData?.code === "USER_003") {
                    alert(errorData.message);
                } else {
                    alert(errorData?.message || "회원가입 중 알 수 없는 오류가 발생했습니다.");
                }
            }
        }
    };
    

    return (
        <div className={Container}>
            <h1 className={headerText}>회원가입</h1>

            <div className={Container}>
                {/* 아이디 */}
                {step === 1 && (
                    <>
                        <h3 className={S.Text}>아이디</h3>
                        <input
                            type={"text"}
                            {...getInputProps("id")}
                            placeholder={"아이디를 입력해주세요 (8~20자, 대소문자/숫자만 가능)"}
                            className={inputBox}
                        />

                        {touched.id && errors.id && <div className={S.errorMessageStyle}>{errors.id}</div>}
                        <button
                            type="button"
                            onClick={handleNext}
                            className={`${btnStyle} ${isStepValid() ? btnActive : btnInactive}`}
                            disabled={!isStepValid()}
                        >
                            다음
                        </button>
                    </>
                )}

                {/* 비밀번호 */}
                {step === 2 && (
                    <>  
                        <div className={S.inputContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...getInputProps("password")}
                                placeholder={"비밀번호"}
                                className={inputBox}
                            />
                            <div
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? (
                                    <FaEye className={S.iconBtn} />
                                ) : (
                                    <FaEyeSlash className={S.iconBtn} />
                                )}
                            </div>
                        </div>
                        
                        {/* 비밀번호 확인 입력 */}
                        <div className={S.inputContainer}>
                            <input
                                type={showPasswordCheck ? "text" : "password"}
                                {...getInputProps("passwordCheck")}
                                placeholder={"비밀번호 확인"}
                                className={inputBox}
                            />
                            <div
                                
                                onClick={() => setShowPasswordCheck(prev => !prev)}
                            >
                                {showPasswordCheck ? (
                                    <FaEye className={S.iconBtn} />
                                ) : (
                                    <FaEyeSlash className={S.iconBtn} />
                                )}
                            </div>
                        </div>

                        {touched.password && errors.password && <div className={S.errorMessageStyle}>{errors.password}</div>}
                        {touched.passwordCheck && errors.passwordCheck && <div className={S.errorMessageStyle}>{errors.passwordCheck}</div>}
                        <button
                            type="button"
                            className={`${btnStyle} ${isStepValid() ? btnActive : btnInactive}`}
                            onClick={handleNext}
                            disabled={!isStepValid()}
                        >
                            다음
                        </button>
                    </>
                )}

                {/* 닉네임 */}
                {step === 3 && (
                    <>  
                        <div className={Container}>
                            <input
                                type={"name"}
                                placeholder={"이름"}
                                {...getInputProps("nickname")}
                                className={inputBox}
                            />
                            
                            {touched.nickname && errors.nickname && <div className={S.errorMessageStyle}>{errors.nickname}</div>}
                            <button
                                type="button"
                                className={`${btnStyle} ${isStepValid() ? btnActive : btnInactive}`}
                                onClick={handleSubmit}
                                disabled={!isStepValid()}
                            >
                                회원가입
                            </button>
                        </div>
                    </>
                )}
                
            </div>
            <h1 className={S.LinkText}>이미 회원이신가요?   
                <Link to="/login" className={linkStyle}>로그인</Link>
            </h1>
        </div>
    )
};

export default SignupPage;