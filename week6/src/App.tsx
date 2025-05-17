import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const getUsers = async () => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users');
  return response.data.data;
};


function App() {
  const [isClicked, setIsClicked] = useState(false);

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: isClicked,
  })

  // const handleClick = () => {
  //   setIsClicked((prev) => !prev);
  // }

  return (
    <>
      <h1>유저 목록</h1>
      <button onClick={() => setIsClicked(true)}>데이터 가져오기</button>
        <ul>
          {data?.nicknameList.map((nickname: string, idx: number) => (
            <li key={idx}>{nickname}</li>
          ))}
        </ul>
    </>
  )
}

export default App



/*
  return (
    <>
      <h1>유저 목록</h1>
      <button onClick={handleClick}>데이터 가져오기</button>
      {isClicked && (
        <ul>
          {data?.nicknameList.map((nickname: string, idx: number) => (
            <li key={idx}>{nickname}</li>
          ))}
        </ul>
      )}
    </>
  )
}

*/