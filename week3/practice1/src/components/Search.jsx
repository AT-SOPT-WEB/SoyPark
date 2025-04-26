import { css } from '@emotion/react';

const searchContainerStyle = css`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
`

const inputStyle = css`
    display: flex;
    border-radius: 5px;
    padding: 8px;
    border: 1px solid gray;
    width: 400px;
`

const buttonStyle = css`
    border-radius: 5px;
    border: none;
    padding: 10px;
    background-color: lightsteelblue;
    cursor: pointer;
    font-weight: bold;
`

const Search = ({ search, handleSearchChange, handleSearch }) => {

    return (
        <div css={searchContainerStyle}>
            <input 
                type="text" 
                value={search} 
                onChange={handleSearchChange} 
                css={inputStyle}
            />
            <button 
                css={buttonStyle} 
                onClick={handleSearch}>
                검색
            </button>
        </div>
    );
};

export default Search;