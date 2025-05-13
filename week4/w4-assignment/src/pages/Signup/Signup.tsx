import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Container, headerText, inputBox, btnStyle, linkStyle} from "../Login/LoginStyle.css"
import * as S from "./SignupStyle.css";

const SignupPage = () => {
    
    // 단계별 진행 
    const [step, setStep] = useState(1);

    // 입력값 확인용

    
    // step에 따른 조건
    // const isStep1Valid = !errors.id && id;
    // const isStep2Valid = !errors.password && !errors.passwordCheck && password && passwordCheck;
    
    // 비밀번호 보이기
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);


    return (
        <div className={Container}>
            <h1 className={headerText}>회원가입</h1>
            <div>
                {/* 아이디 */}
                {step === 1 && (
                    <>
                        <input
                            type={"text"}
                            placeholder={"아이디를 입력해주세요 (8~20자, 대소문자/숫자만 가능)"}
                            className={inputBox}
                        />

                        <div className={S.errorMessageStyle}>최대 길이는 20자 이하로 입력해주세요.</div>
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className={btnStyle}
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

                        <div className={S.errorMessageStyle}>에러</div>  

                        <button
                            type="button"
                            className={btnStyle}
                            onClick={() => setStep(3)}
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
                                className={inputBox}
                            />
                            
                            <button
                                type="button"
                                className={btnStyle}
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