/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { BodyWrapperStyle } from '../CommonStyle';
import CommonInput from '../../components/CommonInput';
import {ProfileWrapper, 
    profileImg, 
    ProfileName,
    ProfileId,
    ProfileBio,
    FollowWrapper,
    FollowContainer,
    FollowText,
    FollowNum,
    iconStyle, 
} from './GitHubStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function GithubPage() {
    const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
    const [inputValue, setInputValue] = useState('');
    
    const getUserInfo = async (user) => {
        setUserInfo({ status: 'pending', data: null });
        try {
            const response = await fetch(`https://api.github.com/users/${user}`);
            if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUserInfo({ status: 'resolved', data });
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
            console.log(userInfo);
        }
    }

    return(
        <div css={BodyWrapperStyle}>
            <h2>GitHub 프로필 검색</h2>
            <CommonInput
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="GitHub 프로필을 검색해보세요."
            />

            {userInfo.status === 'resolved' && (
                <div css={ProfileWrapper}>
                    <FontAwesomeIcon icon={faTimes} onClick={handleClose} css={iconStyle}/>
                    <a href={userInfo.data.html_url}>
                        <img src={userInfo.data.avatar_url} css={profileImg} />
                    </a>
                    <p css={ProfileName}>{userInfo.data.name}</p>
                    <p css={ProfileId}>{userInfo.data.login}</p>
                    <p css={ProfileBio}>{userInfo.data.bio}</p>
                    <div css={FollowWrapper}>
                        <div css={FollowContainer}>
                            <p css={FollowText}>Followers</p>
                            <p css={FollowNum}>{userInfo.data.followers}</p>
                        </div>
                        <div css={FollowContainer}>
                            <p css={FollowText}>Following</p>
                            <p css={FollowNum}>{userInfo.data.following}</p>
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default GithubPage;