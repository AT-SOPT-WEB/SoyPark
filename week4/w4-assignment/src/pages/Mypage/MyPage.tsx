import * as S from "../Login/LoginStyle.css";
import * as M from "./MypageStyle.css";
import { patchNicname } from "../../apis/auth";
import { useState } from "react";

const Mypage = () => {
    const [newName, setNewName] = useState("");

    const handleSave = async () => {
        try {
            const response = await patchNicname(newName);

            if (response.success) {
                alert("닉네임 수정 성공");
                window.location.reload();
                
            } else {
                alert("닉네임 수정 실패: " + response.message);
            }
        } catch (err) {
            console.error("닉네임 수정 에러", err);
        }
    };

    const isFormValid = newName.trim() !== "";

    return (
        <div>
            <div className={S.Container}>
                <h1 className={S.headerText}>내 정보 수정하기</h1>

                <h3 className={M.Text}>새 닉네임</h3>
                <input
                    type="text"
                    placeholder="새 닉네임을 입력하세요"
                    className={S.inputBox}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <button
                    type="button"
                    onClick={handleSave}
                    className={`${S.btnStyle} ${isFormValid ? S.btnActive : S.btnInactive}`}
                >
                    저장
                </button>
            </div>
        </div>
    )
}

export default Mypage;