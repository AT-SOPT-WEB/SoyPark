import { FaRegUser } from "react-icons/fa6";
import * as s from "./HeaderStyle.css"
import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfo } from "../types/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ResponseMyInfo | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
        }

        getData();
    }, []);

    const handleNavigate = (select: string) => {
        if(select === 'me') {
            navigate("/mypage/info");
        } else if (select === 'search'){
            navigate("/mypage/search");
        }
    }

    return (
        <div className={s.HeaderContainer}>
            <div className={s.LeftText}>
                <h1 className={s.HeaderText} onClick={() => handleNavigate('me')}>내 정보</h1>
                <h1 className={s.HeaderText} onClick={() => handleNavigate('search')}>SOPT 회원 조회하기</h1>
                <h1 className={s.HeaderText}>로그아웃</h1>
            </div>
            <div className={s.RightText}>
                <FaRegUser className={s.userIcon} />
                <h1 className={s.HeaderText}>{data?.data?.nickname}</h1>
            </div>
        </div>
    )
};

export default Header;