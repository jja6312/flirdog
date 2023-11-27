import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';

const MydogUpdateForm = () => {
    const { userId } = useParams()
    console.log(userId)

    const [dogsInfoDTO, setdogsInfoDTO] = useState({
        name: '',
        id: userId,
        dogsInfo: '',
        image: '',
    })
    const { name, id, dogsInfo,image } = dogsInfoDTO

    const navigate = useNavigate()

    const [reset, setReset] = useState(false)

    const onInput = (e) => {
        const { name, value } = e.target

        setdogsInfoDTO({
            ...dogsInfoDTO,
            [name]: value 
        })
    }
    
    useEffect(() => {
        axios.get(`/mypage/getDogInfo?id=${userId}`)
             .then(res => {
                setdogsInfoDTO(res.data);
                     console.log(dogsInfoDTO);
    })
             .catch(error => console.log(error))
    }, [])

    const onReset = (e) => {
        setReset(!reset)
    }

    return (
        <div>
            <form className={ Mypage.updateFormTest }>
                <table border='1'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type='text' name='name' value={ name } onChange={ onInput } />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type='text' name='id' value={ id } readOnly />                                    
                            </td>
                        </tr>

                        <tr>
                            <th>개정보</th>
                            <td>
                                <input type='text' name='dogsInfo' value={ dogsInfo } readOnly />                                    
                            </td>
                        </tr>

                        <tr>
                            <th>이미지</th>
                            <td>
                                <img src={`../storage/${encodeURIComponent(image)}`} 
                                    // 아미지 할때 한글이름 넣지마라.원래 encodeURIComponent이거 되야되는데 이걸로도 해결안되네
                                        alt=''
                                        style={{ width: 100, height: 100 }} />                                 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='center'>
                                {/* <button onClick={ onUpdateSubmit }>수정</button> &nbsp; */}
                                {/* <button onClick={ onDeleteSubmit }>삭제</button> &nbsp; */}
                                <button onClick={ () => navigate('/mypage/MydogProfile') }>목록</button> &nbsp;
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>                    
                    <tfoot></tfoot>
                </table>
            </form>
        </div>
    );
};

export default MydogUpdateForm;