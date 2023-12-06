import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const [user, setUser] = useState({
  //   id: "",
  //   email: "",
  //   passwd: "",
  //   name: "",
  //   nickname: "",
  //   communityScore: "",
  //   point: "",
  //   createdAt: "",
  //   modifiedAt: "",
  //   userRole: "",
  // });
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // 임시방편으로 로컬 스토리지에 로그인 정보를 저장하고, 그 정보를 가져옴
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        // JSON.parse가 정상적으로 되었을 때만 setUser 호출
        if (parsedUser && parsedUser.id) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }

    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
  }, []);

  const login = (userData) => {
    axios
      .post("http://localhost:8080/access/login", null, {
        params: {
          email: userData.email,
          passwd: userData.passwd,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/");
        console.log("user");
        console.log(user);
      })
      .catch((e) => {
        //swal로 로그인실패
        Swal.fire({
          icon: "error",
          title: "이메일과 비밀번호를 확인해주세요.",
          showConfirmButton: false,
          timer: 700,
        });

        console.log(e);
      });
  };

  const logout = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      localStorage.removeItem("user");
      setUser({});

      navigate("/");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
