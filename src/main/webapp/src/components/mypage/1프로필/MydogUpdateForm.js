import axios from 'axios';
import React, { useEffect, useState ,useRef} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Mypage2 from '../../../css/main/100마이페이지/mypage2.module.css';
import Header from '../../main/Header';
import Image from 'react-bootstrap/Image';

const MydogUpdateForm = () => {
    const { userId } = useParams()
    console.log(userId)

    const [dogsInfoDTO, setdogsInfoDTO] = useState({
        name: '',
        id: userId,
        dogsInfo: '',
        image: '',
        gender: '',
        dogsBreed: '',
        dogsWeight: '7.1',
        age: '',
    })
    const { name, dogsInfo,image,gender,dogsBreed,dogsWeight,age} = dogsInfoDTO

    const navigate = useNavigate()


    
    useEffect(() => {
        axios.get(`/mypage/getDogInfo?id=${userId}`)
             .then(res => {
                setdogsInfoDTO(res.data);
                     console.log(dogsInfoDTO);
    })
             .catch(error => console.log(error))
    }, [])

  
    return (
        <div>
            <Header></Header> 
            <div className={Mypage2.MydogUpdateFormWrapper}>
                <div className={Mypage2.MydogUpdateFormWrapper2}>
                    <div>
                        <div className={Mypage2.MydogUpdateFormImage}>
                            <div className={Mypage2.MydogUpdateFormImage1}> 
                                <Image alt={name} src={`/storage/${encodeURIComponent(image)}`} roundedCircle className={Mypage.RoundedCircle} style={{ width: 100, height: 100, border: '1px solid #ddd' }} />
                            </div>
                            <h4 className={Mypage2.MydogUpdateFormImgae2} style={{marginTop:'20px',marginBottom:'20px'}}>{name}</h4>
                        </div>
                        <div className={Mypage2.MydogUpldateFormItem}> 나이 : {age} 세  </div>
                        <div className={Mypage2.MydogUpldateFormItem}> 품종 : {dogsBreed}</div>
                        <div className={Mypage2.MydogUpldateFormItem}> 성별 : {gender}</div>
                        <div className={Mypage2.MydogUpldateFormItem}> 몸무게 : {dogsWeight} kg</div>
                    </div>
                    <div className={Mypage2.MydogUpldateButton}> 
                        <button className={Mypage2.MydogUpldateButton2} onClick={ () => navigate('/mypage/MydogProfile') }>목록으로</button>
                        <Link  className={Mypage2.MydogUpldateButton3} to={`/mypage/MydogUpdateForm2/${userId}`} style={{textAlign:'center'}}>
                            <span className= {Mypage2.MydogUpldateButton4} >수정하기</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MydogUpdateForm;