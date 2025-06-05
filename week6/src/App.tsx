import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const userId = 170;

const getMyNickname = async (userId: number) => {
  const response = await axios.get('https://api.atsopt-seminar4.site/api/v1/users/me', {
    headers: {
      userId: userId
    }
  });
  return response.data.data;
};

const patchMyNickname = async (newNickname: string) => {
  const response = await axios.patch('https://api.atsopt-seminar4.site/api/v1/users', 
    { nickname: newNickname },
    {
      headers: {
        userId: userId
      }
    }
  );
  return response.data.data;
};

function App() {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['myNickname', userId],
    queryFn: () => getMyNickname(userId)
  });

  const { mutate } = useMutation({
    mutationFn: patchMyNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['myNickname', userId]});
      setText('');
    }
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      내 정보:
      {data && <span> {data.nickname}</span>}
      <br />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='수정할 닉네임 입력'
      />
      <button onClick={() => mutate(text)}>
        닉네임 수정하기
      </button>
    </div>
  );
}

export default App;