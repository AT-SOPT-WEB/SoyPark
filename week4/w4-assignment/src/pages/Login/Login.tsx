import { Link } from "react-router-dom";
import * as S from "./LoginStyle.css";

const LoginPage = () => {
    return (
        <div className={S.Container}>
            <h1 className={S.headerText}>로그인</h1>

            <div className={S.inputWrapper}>
                <input
                    type="text"
                    placeholder="아이디"
                    className={S.inputBox}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className={S.inputBox}
                />
            </div>

            <button
                type="button"
                className={S.btnStyle}
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

