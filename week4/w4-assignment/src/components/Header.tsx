import { FaRegUser } from "react-icons/fa6";
import * as s from "./HeaderStyle.css"
import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfo } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { IoMenu, IoClose } from "react-icons/io5";

const Header = () => {
    const navigate = useNavigate();
    const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
    const [data, setData] = useState<ResponseMyInfo | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
        }

        getData();
    }, []);

    const handleNavigate = (select: string) => {
        setIsMenuBarOpen(false);
        if(select === 'me') {
            navigate("/mypage/info");
        } else if (select === 'search'){
            navigate("/mypage/search");
        }
    }

    const handleLogout = () =>{
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        setIsMenuBarOpen(false);
        alert("로그아웃 완료!");
        navigate("/login");
    }

    return (
        <header className={s.HeaderContainer}>
            <div className={s.LeftText}>
                <div className={s.MenuIcon} onClick={() => setIsMenuBarOpen(prev => !prev)}>
                    {isMenuBarOpen ? (
                        <IoClose size={28} color="white" />
                    ) : (
                        <IoMenu size={28} color="white" /> 
                    )}
                </div>
                <nav className={s.DesktopMenu}>
                    <button className={s.HeaderText} onClick={() => handleNavigate("me")}>내 정보</button>
                    <button className={s.HeaderText} onClick={() => handleNavigate("search")}>SOPT 회원 조회하기</button>
                    <button className={s.HeaderText} onClick={handleLogout}>로그아웃</button>
                </nav>
            </div>

            <div className={s.RightText}>
                <FaRegUser className={s.userIcon} />
                <h1 className={s.HeaderText}>{data?.data?.nickname}</h1>
            </div>

            {isMenuBarOpen && (
                <div className={`${s.MobileMenu} ${isMenuBarOpen ? s.slideOpen : s.slideClose}`}>
                    <h1 className={s.MobileText} onClick={() => handleNavigate("me")}>내정보</h1>
                    <h1 className={s.MobileText} onClick={() => handleNavigate("search")}>SOPT 회원 조회하기</h1>
                    <h1 className={s.MobileText} onClick={handleLogout}>로그아웃</h1>
                </div>
            )}
        </header>
    );
};

export default Header;