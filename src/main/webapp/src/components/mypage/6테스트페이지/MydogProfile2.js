import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MydogProfile2 = () => {
    const[list,setList] = useState([])

    useEffect(()=>{
        axios.get('/mypage/uploadList')
            .then((res)=>{
                setList(res.data)
                console.log(res.data)
                // alert(`../storage/${encodeURIComponent(item.image)`)
                // alert(res.data)
            })
            .catch(error=>
            	console.log(error))
    },[])

    return (
        <div>
            <table border = '1'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이미지</th>
                        <th>상품명</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => <tr key={ item.id } style={{ textAlign:'center' }}>
                            <td>{ item.id }</td>
                            <td>
                                <img src={`../storage/${encodeURIComponent(item.image)}`} 
                                // 아미지 할때 한글이름 넣지마라.원래 encodeURIComponent이거 되야되는데 이걸로도 해결안되네
                                     alt={ item.imageName } 
                                     style={{ width: 100, height: 100 }} />
                            </td>
                            <td>{ item.name }</td>
                            {/* 한글들어가면 안보이넹.ㅠ */}
                        </tr>)
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
};
export default MydogProfile2;