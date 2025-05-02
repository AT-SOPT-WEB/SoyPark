/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const ProfileWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    padding: 18px;
    width: 45%;
    height: 50%;

    border-radius: 15px;
    background-color:rgb(14, 40, 31);
`

export const iconStyle = css`
    align-self: flex-end;
    font-size: 20px;
    color: white;
    cursor: pointer;

    &:hover {
        color: #90C67C;
    }
`;

export const profileImg = css`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 5px solid #90C67C;
    object-fit: cover;
`
export const ProfileName = css`
    font-size: 25px;
    font-weight: bold;
    color: white;
    margin: 5px;
`

export const ProfileId = css`
    font-size: 13px;
    color: gray;
`

export const ProfileBio = css`
    font-size: 15px;
    margin: 0;
`
export const FollowWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: space-around;
    width: 100%;
    height: 60px;
    margin-top: 50px;
    gap: 5px;
`

export const FollowContainer = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    justify-content: center;

    width: 100%;
    border-radius: 8px;
    background-color:rgba(144, 198, 124, 0.81);
`

export const FollowText = css`
    font-size: 15px;
    color: white;
    margin: 0;
`

export const FollowNum = css`
    font-size: 13px;
    font-weight: bold;
    color: white;
    margin: 0;
`

export const SearchListWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0;
    width: 50%;
    gap: 15px;
    margin-top: 20px;
`
export const RecentSearchContainer = css`
    display: flex;
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0;
    gap: 10px;
`

export const RecentItem = css`
    border: 2px solid #90C67C;
    border-radius: 25px;
    background-color:rgba(144, 198, 124, 0.58);

    padding: 10px;
    cursor: pointer;
`

export const searchBtn = css`
    border: none;
    background: none;
    font-weight: bold;
    font-size: 13px;

    &:hover {
        color:rgb(239, 51, 51);
    }
`

export const RecentHeaderText = css`
    margin: 0;
`
