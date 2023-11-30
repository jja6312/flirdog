import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    passwd: '',
    name: '',
    nickname: '',
    communityScore: '',
    point: '',
    createdAt: '',
    modifiedAt: '',
    userRole: '',
  });
  const navigate = useNavigate();

  // 임시방편으로 로컬 스토리지에 로그인 정보를 저장하고, 그 정보를 가져옴
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    axios.post('/login', userData)
      .then(res => {
        setUser(res.data)
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data));
        alert('로그인 되었습니다.')
        navigate('/')
      })
      .catch(e => console.log(e))
  };

  const logout = () => {
    if(window.confirm('정말 로그아웃하시겠습니까?')) {
      localStorage.removeItem('user');
      setUser({});
      alert('로그아웃 되었습니다.')
      navigate('/')
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;