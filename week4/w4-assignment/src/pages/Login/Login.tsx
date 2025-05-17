import { Link, useNavigate } from "react-router-dom";
import * as S from "./LoginStyle.css";
import { useState } from "react";
import { LOCAL_STORAGE_KEY } from "../../constants/key";
import { postSignin } from "../../apis/auth";

const LoginPage = () => {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const isFormValid = loginId.trim() !== "" && password.trim() !== "";

    const handleLogin = async () => {
        try {
            const response = await postSignin({ loginId, password });

            if (response.success && response.data) {
                localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, response.data.userId.toString());
                alert("로그인 성공");
                navigate("/mypage/info");
                window.location.reload();

            } else {
                alert("로그인 실패: " + response.message);
            }
        } catch (err) {
            console.error("로그인 에러", err);
        }
    };

    return (
        <div className={S.Container}>
            <h1 className={S.headerText}>로그인</h1>

            <div className={S.inputWrapper}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={loginId}
                    className={S.inputBox}
                    onChange={(e) => setLoginId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    className={S.inputBox}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="button"
                disabled={!isFormValid}
                className={`${S.btnStyle} ${isFormValid ? S.btnActive : S.btnInactive}`}
                onClick={handleLogin}
            >
                로그인
            </button>

            <Link to="/signup" className={S.linkStyle} >
                회원가입 
            </Link>
        </div>
    )
}

export default LoginPage;

