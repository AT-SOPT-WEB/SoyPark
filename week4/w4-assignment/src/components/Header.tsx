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
    const [isMenuBarOPen, setIsMenuBarOPen] = useState(false);
    const [data, setData] = useState<ResponseMyInfo | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
        }

        getData();
    }, []);

    const handleNavigate = (select: string) => {
        setIsMenuBarOPen(false);
        if(select === 'me') {
            navigate("/mypage/info");
        } else if (select === 'search'){
            navigate("/mypage/search");
        }
    }

    const handleLogout = () =>{
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        setIsMenuBarOPen(false);
        alert("로그아웃 완료!");
        navigate("/login");
    }

    return (
    <header className={s.HeaderContainer}>
      <div className={s.LeftText}>
        {/* 햄버거 메뉴 아이콘 */}
        <div className={s.Hamburger} onClick={() => setIsMenuBarOPen(true)}>
          <IoMenu size={28} color="#fff" />
        </div>
        <nav className={s.DesktopMenu}>
          <h1 onClick={() => handleNavigate("me")}>내 정보</h1>
          <h1 onClick={() => handleNavigate("search")}>SOPT 회원 조회하기</h1>
          <h1 onClick={handleLogout}>로그아웃</h1>
        </nav>
      </div>

      <div className={s.RightText}>
        <FaRegUser className={s.userIcon} />
        <h1>{data?.data?.nickname}</h1>
      </div>

      {/* 모바일 메뉴 - 슬라이드 다운 */}
      {isMenuBarOPen && (
        <div className={s.MobileMenu}>
          <div className={s.MobileMenuHeader}>
            <IoClose size={28} onClick={() => setIsMenuBarOPen(false)} />
          </div>
          <h1 onClick={() => handleNavigate("me")}>내정보</h1>
          <h1 onClick={() => handleNavigate("search")}>SOPT 회원 조회하기</h1>
          <h1 onClick={handleLogout}>로그아웃</h1>
        </div>
      )}
    </header>
  );
};

export default Header;