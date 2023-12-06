import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../../../css/somoim/detail/somoimMember.module.css';

const SomoimDetailMember = ({ somoimId, isAdmin, user }) => {
    const [formData, setFormData] = useState({}); // 소모임 정보

    // const [dogsBreed, setDogsBreed] = useState({}) // 매칭테이블 강아지 이름 상태변수
    const [userDTO, setUserDTO] = useState([{}]); // 유저 정보 리스트
    const [userList, setUserList] = useState([]) // 유저 리스트
    const [dogsInfo, setDogsInfo] = useState([]); // 매칭테이블 이미지 상태변수
    const [listUser, setListUser] = useState([]); // 매칭테이블 유저 아이디 상태변수
    const [dogsBreed, setDogsBreed] = useState([]); // 매칭테이블 dogsBreed 상태변수
    const [finalInfo, setFinalInfo] = useState([{}]);

    // 해당 소모임의 정보 조회
    useEffect(() => {
        console.log('소모임 멤버에서 부르는 로그인 유저 아이디 :' + (user && user.id ? user.id : 'User 정보 없음'));
        console.log('소모임 멤버에서 부르는 소모임 아이디 :' + somoimId)

        //if (user && user.id) {
            axios.get(`/somoim/getSomoimForm?id=${somoimId}`)
                .then(res => {
                    setFormData(res.data)
                })
                .catch(error => console.log(error))
        //}
    },[somoimId, user])

    // 해당 소모임 유저 목록 조회
    useEffect(() => {
        console.log('멤버에서 해당 유저 조회 : ' + user.id)
        axios.get(`/somoim/getSomoimUserList?somoimId=${somoimId}`)
            .then(res => {
                setUserDTO(res.data)
                console.log('유저 데이터목록 : ', res.data);
                //console.log('유저 데이터 이름 목록 : ', res.data[0].name);

                // 각 사용자의 id 출력
                res.data.forEach(userDTO => {
                    console.log('유저 데이터 이름 목록 : ', userDTO.id);
                });
            })
            .catch(e => console.log(e))
        
    },[somoimId, user.id])

    // 해당 소모임 유저 리스트 조회
    useEffect(() => {
        axios.get(`/somoim/getSomoimAllList?somoimId=${somoimId}`)
            .then(res => {
                const memberList = res.data.map(item => ({
                    user: {
                        id: item.user.id,
                        name: item.user.name,
                        // 여기에 다른 user 객체의 속성 추가
                    },
                    isAdmin: item.isAdmin
                }));
    
                setUserList(memberList);
                console.log('userList:', memberList);
            })
            .catch(e => console.log(e))
        
    },[somoimId])
    

    // 매칭테이블 이미지와 유저 id 조회
    useEffect(() => {
        axios
          .get(`/somoim/getDogsInfo`)
          .then((res) => {
            console.log("독스인포");
            console.log(res.data);
            console.log('독스인포 이미지 : ', res.data.map(item => ({ image: item.image, user: { id: item.user.id, name: item.user.name } })));

            // 독스인포 데이터 추출
            const extractedData = res.data.map(item => ({
                image: item.image,
                user: { id: item.user.id, name: item.user.name }
            }));

            // 이미지 정보를 상태 변수에 저장
            setDogsInfo(extractedData.map(item => item.image));
            // 유저 ID를 상태 변수에 저장
            setListUser(extractedData.map(item => item.user.id));
            // 해당 dogsBreed를 상태 변수에 저장
            setDogsBreed(extractedData.map(item => item.dogsBreed));

            // userDTO와 dogsInfo를 합쳐서 finalInfo에 저장
            const updatedFinalInfo = userDTO.map((currentUserInfo) => {

                const matchingDogInfo = extractedData.find(item => item.user.id === currentUserInfo.id);

                // 현재 유저 정보와 dogsInfo가 있는 경우에만 추가
                const finalInfoItem =  {
                    userDTO: currentUserInfo,
                    dogsInfo: matchingDogInfo ? matchingDogInfo.image : null,
                    listUser: matchingDogInfo ? matchingDogInfo.user.id : null,
                    dogsBreed: matchingDogInfo ? matchingDogInfo.dogsBreed : null,
                    isAdmin: matchingDogInfo ? userList.find(item => item.user.id === matchingDogInfo.user.id)?.isAdmin || null : null,
                };
                
                    
                    console.log('finalInfoItem', finalInfoItem)
                return finalInfoItem;
            });

            setFinalInfo(updatedFinalInfo);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [userDTO, userList]); // userDTO가 변경될 때만 useEffect 실행

    // 유저 강퇴(해당 테이블 목록에서 삭제)
    const handleBanUser = (somoimId, userId) => {
        if (window.confirm("정말 해당 유저를 추방하시겠습니까?")) {
            try {
                //axios.delete(`/somoim/deleteUser?somoimId=${somoimId}&userId=${userId}`)
                axios.delete(`/somoim/deleteUser`, { params: { somoimId, userId } })
                .then(res => {
                    console.log('강퇴 응답 데이터:', res.data);
                    alert('해당 유저는 강퇴되었습니다.')
    
                    // 강퇴 성공 후 finalInfo에서 해당 유저를 제외하고 업데이트
                    const updatedFinalInfo = finalInfo.filter(item => item.userDTO.id !== userId);
                    setFinalInfo(updatedFinalInfo);
                })
                .catch(e => console.log(e))
            } catch(error) {
                console.log('404 Error')
              }
            
          }
    } 

    console.log('finalInfo2', finalInfo);

    return (
        <div className='col-12'>
            소모임 멤버 페이지 입니다.<br/>
            (이즈머드민 : {isAdmin})
            {
                isAdmin === 2 && (
                    <div>
                        <div>(당신은 아직 미가입자 입니다.)</div><br/>
                    </div>
                )
            }
           {
             finalInfo.map((item, index) => (
                // <div className="d-flex gap-2 align-items-start" key={item.id}>
                <div className={`d-flex gap-2 align-items-start`} key={item.id}>
                    <Button className={`${styles.container} mb-3`} variant="warning" size="lg">
                        {/* <div className={`${styles.profileImage} col-2`} /> */}
                        <img
                            alt={`${item.dogsBreed}`}
                            src={`${
                                item.dogsInfo === null ? "/image/nullImage/nullImage1.png" : `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${item.dogsInfo}`
                            }`}
                            style={{ width: "30px", height: "30px" ,objectFit: "cover" }}
                            />
                        {
                            item.isAdmin === 1 ?
                            <div className={`${styles.name} ${styles.master} col-3`}> 
                                {item.userDTO && item.userDTO.name} 
                                ({item.userDTO && item.userDTO.nickname})
                                <span>&nbsp;&nbsp;Admin</span>
                            </div> :
                            <div className={`${styles.name} col-3`}> 
                                {item.userDTO && item.userDTO.name} 
                                ({item.userDTO && item.userDTO.nickname})
                            </div>
                        }
                        <div className={`flex-grow-1 ${styles.communityScore} col-3`}>
                            커뮤니티 점수 : {item.userDTO && item.userDTO.communityScore}
                        </div>
                        <div className="ban col-2" 
                             style={{ visibility: (isAdmin === 1 && item.isAdmin === 1) && 'hidden' }}>
                            <Button variant="danger" onClick={() => handleBanUser(somoimId, item.userDTO && item.userDTO.id)}>
                                강퇴
                            </Button>
                        </div>
                        {/* {
                            isAdmin === 1 && item.isAdmin === 1 ||
                            <div className='ban col-2'>
                                <Button >
                                    강퇴
                                </Button>
                            </div>
                        } */}
                    </Button>
                </div>
             ))
           }
        </div>
    );
};

export default SomoimDetailMember;