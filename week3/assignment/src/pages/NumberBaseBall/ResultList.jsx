/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function ResultList({ resultList }) {
    return (
        <div css={ListWrapper}>
            {resultList.map((result, index) => (
                <ul css={listStyle}>
                    <li key={index} css={itemStyle}>
                        <span>{result.result}</span>
                    </li>
                </ul>
            ))}
        </div>
    );
}

const ListWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 100%;
    gap: 15px;
    margin-top: 30px;
`;

const listStyle = css`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 53%;
    border-radius: 15px;
    border: 2px solid #328E6E;
`;

const itemStyle = css`
    padding: 10px;
    font-size: 16px;
    text-align: center;
`;

export default ResultList;