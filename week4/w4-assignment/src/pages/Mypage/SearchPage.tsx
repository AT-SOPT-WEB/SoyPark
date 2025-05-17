import { searchInfo } from "../../apis/search";
import * as S from "../Login/LoginStyle.css";
import * as M from "./MypageStyle.css";
import { useState } from "react";

const SearchPage = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [result, setResult] = useState<string[]>([]);

    const handleSearch = async () => {
        try {
            const response = await searchInfo(searchKeyword);

            if (response.success) {
                const nicknameList = response.data.nicknameList;
                setResult(nicknameList);
                
                if (nicknameList.length === 0) {
                    alert("일치하는 회원이 없습니다.");
                    setResult([]);
                } else {
                    setResult(nicknameList);
                }
            } 
            else {
                alert("조회 실패: " + response.message);
            }
        } catch (err) {
            console.error("조회 에러", err);
        }
    };


    return (
        <div>
            <div className={S.Container}>
                <h1 className={S.headerText}>SOPT회원 조회하기</h1>

                <h3 className={M.Text}>닉네임</h3>
                <input
                    type="text"
                    placeholder="검색할 닉네임을 입력하세요"
                    className={S.inputBox}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    className={M.btnStyle}
                >
                    확인
                </button>

                {result.map((result, idx) => {
                    return (
                        <div key={idx}>
                            <h1 className={M.resultText}>{result}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchPage;