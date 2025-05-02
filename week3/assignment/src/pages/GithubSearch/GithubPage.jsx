/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { BodyWrapperStyle } from '../CommonStyle';
import CommonInput from '../../components/CommonInput';
import * as G from './GitHubStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from "../../hooks/useLocalStorage";


function GithubPage() {
    const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
    const [inputValue, setInputValue] = useState('');
    const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
    
    const getUserInfo = async (user) => {
        setUserInfo({ status: 'pending', data: null });
        try {
            const response = await fetch(`https://api.github.com/users/${user}`);
            if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUserInfo({ status: 'resolved', data });
                addSearch(user);
            } catch {
                setUserInfo({ status: 'rejected', data: null });
            }
        };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const handleClose = () => {
        setUserInfo({ status: 'idle', data: null });
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            getUserInfo(inputValue);
            setInputValue('');
            console.log(userInfo);
        }
    }

    // 최근 검색
    const addSearch = (newSearch) => {
        setRecentSearches((prev) => {
            const filtered = prev.filter((search) => search !== newSearch);
            const updated = [...filtered, newSearch];
            return updated.slice(-3);
        });
    };

    // 개별 삭제 
    const removeSearch = (target) => {
        setRecentSearches((prev) => prev.filter((search) => search !== target));
    };

    return(
        <div css={BodyWrapperStyle}>
            <h2>GitHub 프로필 검색</h2>
            <CommonInput
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="GitHub 프로필을 검색해보세요."
            />

            <div css={G.SearchListWrapper}>
                <h4 css={G.RecentHeaderText}>최근 검색어</h4>
                {recentSearches.length > 0 && (
                    <ul css={G.RecentSearchContainer}>
                        {recentSearches.map((keyword) => (
                        <div css={G.RecentItem} key={keyword}>
                            <span onClick={() => getUserInfo(keyword)}>{keyword}</span>
                            <button css={G.searchBtn} onClick={() => removeSearch(keyword)}>✕</button>
                        </div>
                        ))}
                    </ul>
                )}
            </div>
            
            {userInfo.status === 'resolved' && (
                <div css={G.ProfileWrapper}>
                    <FontAwesomeIcon icon={faTimes} onClick={handleClose} css={G.iconStyle}/>
                    <a href={userInfo.data.html_url}>
                        <img src={userInfo.data.avatar_url} css={G.profileImg} />
                    </a>
                    <p css={G.ProfileName}>{userInfo.data.name}</p>
                    <p css={G.ProfileId}>{userInfo.data.login}</p>
                    <p css={G.ProfileBio}>{userInfo.data.bio}</p>
                    <div css={G.FollowWrapper}>
                        <div css={G.FollowContainer}>
                            <p css={G.FollowText}>Followers</p>
                            <p css={G.FollowNum}>{userInfo.data.followers}</p>
                        </div>
                        <div css={G.FollowContainer}>
                            <p css={G.FollowText}>Following</p>
                            <p css={G.FollowNum}>{userInfo.data.following}</p>
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default GithubPage;