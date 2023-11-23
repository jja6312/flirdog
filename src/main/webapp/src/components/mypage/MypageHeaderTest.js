import React from "react";
import { NavLink } from "react-router-dom";

const MypageHeaderTest = () => {
    const activeStyle = {
        color: "#6392ff",
      };
    
      return (
        <div className="menu">
          <NavLink
            className="link"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/">
            메인
          </NavLink>
    
          <NavLink
            className="link"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/healthadd">
            건강기록
          </NavLink>
    
          <NavLink
            className="link"
            style={({ isActive }) => (isActive ? activeStyle : {})}
            to="/healthlist">
            기록관리
          </NavLink>
        </div>
  );
};

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 200,
//     height: 50,
//     borderRadius: 30,
//     marginBottom: 15,
//   },
// });

export default MypageHeaderTest;