import React, { useContext, useEffect, useState } from 'react';
import Header from '../main/Header';
import { Container} from 'react-bootstrap';
import Footer from '../main/Footer';
import Dropdown from "react-bootstrap/Dropdown";
import BoastBoardListCss from "../../css/boastBoard/boastBoardList.module.css";
import { UserContext } from '../../contexts/UserContext';
import BoastBoardWrite from './BoastBoardWrite';
import axios from 'axios';
import moment from 'moment';
import BoastBoardRead from './BoastBoardRead';

const BoastBoardList = () => {
    
    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id } = user;

    const [boardDTOList, setBoardDTOList] = useState([]);

    // 사용 전에 id가 정의되었는지 확인
    if (id) {
    // id를 이용한 컴포넌트 로직 처리
    console.log(id); // ----3
    }

    // 전체 목록 조회
    useEffect(() => {
        axios
        .get("https://java.flirdog.store:8080/boastBoard/getBoastBoardList")
        .then((res) => {
            console.log(res.data);
            setBoardDTOList(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);


    const [searchName, setSearchName] = useState("전 체");
    const [searchValue, setSearchValue] = useState("");
    const [sortingFilter, setSortingFilter] = useState("작성일");
    const [inputValue, setInputValue] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [swNum, setSwNum] = useState(0);

    const handleSearchSelect = (searchName) => {
        setSearchName(searchName);
        setSearchValue(
            searchName === "전 체" ? "all" :
            searchName === "제 목" ? "title" :
            searchName === "내 용" ? "content" :
            searchName
        )
    };

    /*
    useEffect(() => {
        const fetchData = async () => {
          try {
            // 검색어와 검색값이 주어졌을 때 서버에 요청을 보내어 데이터를 가져옵니다.
            const response = await axios.get(`https://java.flirdog.store:8080/boastBoard/getSearchBoastBoardList?searchValue=${searchValue}&inputValue=${inputValue}`);
            setBoardDTOList(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // 초기 데이터 로딩
        fetchData();
    
        // 일정 주기로 데이터 새로고침 (예: 10초마다)
        const intervalId = setInterval(() => {
          fetchData();
        }, 10000); // 10초마다 새로고침
    
        // 컴포넌트가 언마운트될 때 clearInterval을 통해 interval 정리
        return () => clearInterval(intervalId);
      }, []); // searchValue 또는 inputValue가 변경될 때마다 실행*/
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://java.flirdog.store:8080/boastBoard/getSearchBoastBoardList?searchValue=${searchValue}&inputValue=${inputValue}`);
          setBoardDTOList(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []); // 초기에 한 번만 실행되도록 빈 배열을 전달

    //검색 관련
    //정렬기준
    // 정렬 함수
    const sortData = (data, sortingFilter) => {
        switch (sortingFilter) {
        case "작성일":
            return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case "인기순":
            return data.sort((a, b) => b.likeScore - a.likeScore);
        case "조회수":
            return data.sort((a, b) => b.hit - a.hit);
        default:
            return data;
        }
    };
    
    // 핸들러 함수
    const handleFilterSelect = (filter) => {
        setSortingFilter(filter);
        // sortingFilter 값에 따라 데이터를 정렬하고 상태를 업데이트
        setBoardDTOList((prevData) => sortData([...prevData], filter));
    };
    
    // useEffect 안에서 sortingFilter 값이 변경될 때마다 데이터를 정렬하고 상태를 업데이트
    useEffect(() => {
        setBoardDTOList((prevData) => sortData([...prevData], sortingFilter));
    }, [sortingFilter]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async () => {
        try {
            setSwNum(1);
        
            // 검색 로직을 이곳에 구현하고, 검색 결과를 처리합니다.
            console.log("검색어:", inputValue);
        
            // Axios를 사용하여 서버에 검색 요청을 보냅니다.
            const response = await axios.get(`https://java.flirdog.store:8080/boastBoard/getSearchBoastBoardList?searchValue=${searchValue}&inputValue=${inputValue}`);
        
            // 검색 결과를 state에 저장합니다.
            setBoardDTOList(response.data);
        
            // 이후에 검색 결과에 대한 처리를 추가하면 됩니다.
            console.log("검색 결과:", response.data);
          } catch (error) {
            console.error("검색 중 오류 발생:", error);
          } finally {
            // 검색이 성공하든 실패하든 항상 실행됩니다.
            setSwNum(0);
          }
      };

    //모달 상세보기
    const [showModal, setShowModal] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const handleCardClick = (boardDTO) => {
        setSelectedBoard(boardDTO);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedBoard(null);
        setShowModal(false);
    };


    return (
        <div>
            <Header />
             <Container>
                <br />
                <br />

                {/* 제목 */}
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                    }}>
                    <div style={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            fontSize: '2rem',
                            backgroundColor: '#F56084',
                            padding:'2%',
                            height: '60px',
                        }}>
                        <div style={{
                            fontSize: '0.8em',
                            fontWeight: 'bold',
                            color: 'white',
                        }}>
                            자랑게시판
                        </div>
                    </div>
                    <div style={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            fontSize: '2rem',
                            backgroundColor: 'white',
                            padding:'2%',
                            height: '60px',
                        }}>
                        <div style={{
                            fontSize: '0.8em',
                            fontWeight: 'bold',
                            color: '#404040',
                        }}>
                            내 애견을 자랑해주세요.
                        </div>
                    </div>
                </div>
                <br />
                <br />

                {/* 검색 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '800px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: '#404040',
                        }}>
                            <div style={{
                                fontSize: '0.8em',
                                fontWeight: 'bold',
                                color: '#404040',
                            }}>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className={BoastBoardListCss.filterDropdownBtn}
                                        variant="success"
                                        id="dropdown-basic"
                                        style={{
                                        border: "5px solid #F56084",
                                        backgroundColor: "white",
                                        color: "#F56084",
                                        fontWeight: "bold",
                                        borderRadius: "10px",
                                        fontSize: "1.5em",
                                        }}>
                                        {searchName}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                            className="dropdown-menu scrollContainer"
                                            style={{ maxHeight: "200px", overflowY: "auto" }}
                                        >
                                        <Dropdown.Item
                                                href="#/action-1"
                                                onClick={() => handleSearchSelect("전 체" || "")}
                                                style={{textAlign: "center"}}
                                                >
                                                전 체
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                                href="#/action-1"
                                                onClick={() => handleSearchSelect("제 목" || "")}
                                                style={{textAlign: "center"}}
                                                >
                                                제 목
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                                href="#/action-1"
                                                onClick={() => handleSearchSelect("내 용" || "")}
                                                style={{textAlign: "center"}}
                                                >
                                                내 용
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>&nbsp;&nbsp;&nbsp;
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '500px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: '#404040',
                        }}>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#404040',
                            }}>
                                <input type="text" style={{
                                    width: '100%',
                                    height: '50px',
                                    border: '5px solid pink',
                                    borderRadius: '10px',
                                }} 
                                    // 입력 상자의 값이 변경될 때마다 handleInputChange 함수가 호출되도록 설정합니다.
                                    onChange={handleInputChange}
                                    // 입력 상자의 값은 상태로 설정됩니다.
                                    value={inputValue}
                                /> &nbsp;&nbsp;&nbsp;
                                <button className={BoastBoardListCss.searchBtn}
                                 onClick={handleSearch}
                                >검 색</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className={BoastBoardListCss.boastBoardHr}/>
                <br/>
                
                {/* 게시글 작성 버튼 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <BoastBoardWrite/>
                    
                    
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle
                                className={BoastBoardListCss.listFilterDropdownBtn}
                                variant="success"
                                id="dropdown-basic"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "5px solid #F56084",
                                    backgroundColor: "white",
                                    color: "#F56084",
                                    fontWeight: "bold",
                                    borderRadius: "10px",
                                    fontSize: "1em",
                                    textAlign: "center",
                                }}>
                                {sortingFilter}
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                    className="dropdown-menu scrollContainer"
                                    style={{ maxHeight: "200px", overflowY: "auto" }}
                                >
                                <Dropdown.Item
                                        href="#/action-1"
                                        onClick={() => handleFilterSelect("작성일" || "")}
                                        style={{textAlign: "center",   
                                        }}
                                        >
                                        작성일
                                </Dropdown.Item>
                                <Dropdown.Item
                                        href="#/action-1"
                                        onClick={() => handleFilterSelect("인기순" || "")}
                                        style={{textAlign: "center"}}
                                        >
                                        인기순
                                </Dropdown.Item>
                                <Dropdown.Item
                                        href="#/action-1"
                                        onClick={() => handleFilterSelect("조회수" || "")}
                                        style={{textAlign: "center"}}
                                        >
                                        조회수
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>

                <br />
                {/* 게시글 */}
                <div style={{width:'100%',
                    border: '10px solid pink',
                    borderRadius: '20px',
                    padding:'2%',
                    marginBottom:'30px'
                }}>
                    <div>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {boardDTOList.map((boardDTO, index) => {
                                const createdAt = moment(boardDTO.createdAt);
                                const isToday = createdAt.isSame(new Date(), 'day');
                                const displayDate = isToday ? `${createdAt.format('YYYY. MM. DD')}${'\u00A0\u00A0\u00A0'}${createdAt.format('HH:mm')}` : createdAt.format('YYYY. MM. DD');

                                return (
                                <div className="col" key={index}>
                                    <div className="card" onClick={() => handleCardClick(boardDTO)} style={{cursor: 'pointer'}}>
                                        <img
                                            src={`${
                                            boardDTO.image === "/image/nullImage/nullImage1.png"
                                                ? boardDTO.image
                                                : `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${
                                                    boardDTO.image.split(",")[0]
                                                }`
                                            }`}
                                            className="card-img-top"
                                            alt="..."
                                            style={{
                                            width: '100%',
                                            height: '300px',
                                            objectFit: 'cover',
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ marginBottom:'20px', fontSize:'1.5em'}}>{boardDTO.title}
                                            {boardDTO.commentCount > 0 && (
                                                <span style={{ marginLeft: '5px'}}>({boardDTO.commentCount})</span>
                                            )}</h5>
                                            <p className="card-text" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                            <img src='/image/boastBoard/dogUserImage.jpg' width={25} height={25} alt=''
                                                style={{borderRadius: '50%', border: '2px solid #404040'
                                            }}/>&nbsp;&nbsp;{boardDTO.userNickName}
                                            </p>
                                            <p className="card-text" style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src='/image/boastBoard/calenderImage2.png' width={25} height={25} alt=''
                                            />&nbsp;&nbsp;{displayDate}</p>
                                        </div>
                                    </div>
                                </div>
                                );
                            })}

                            {/* 모달을 띄우는 조건 */}
                            {showModal && <BoastBoardRead boardDTO={selectedBoard} closeModal={closeModal} />}
                        </div>
                    </div>
                </div>
             </Container>
            <Footer />
        </div>
    );
};

export default BoastBoardList;