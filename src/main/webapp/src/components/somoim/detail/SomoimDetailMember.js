import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SomoimDetailMember = ({ somoimId }) => {
    const [formData, setFormData] = useState({});

    const { introduceDetail } = formData;

    useEffect(() => {
        axios.get(`/somoim/getSomoimForm?id=${somoimId}`)
            .then(res => {
                setFormData(res.data)
            }).catch(error => console.log(error))
    },[])

    return (
        <div>
            소모임 일정 페이지 입니다.<br/>
            { introduceDetail }
        </div>
    );
};

export default SomoimDetailMember;