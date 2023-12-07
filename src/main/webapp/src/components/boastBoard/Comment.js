import moment from 'moment';
import React from 'react';

const Comment = ({ commmetList, id, name, content }) => {
    const currentDate = new Date();
    const createdAtDate = moment(currentDate).format('YYYY-MM-DD');
    const createdAtTime = moment(currentDate).format('HH:mm');

    return (
        <>
            <div key={id} style={{  marginBottom:'10px' , borderBottom:'1px solid #eeeeee'}}>
                <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                    <img src='/image/boastBoard/dogUserImage.jpg' width={25} height={25} alt=''
                        style={{borderRadius: '50%', border: '2px solid pink'
                    }}/>&nbsp;&nbsp;
                    <div><strong>{name}</strong></div>&nbsp;&nbsp;
                    <div style={{fontSize:'0.8em', fontWeight:'bold', color:'#707070'}}>{createdAtDate}&nbsp;&nbsp;{createdAtTime}</div>&nbsp;&nbsp;
                </div>
                <div style={{}}>
                    <div style={{color:'#707070', fontWeight:'bold'}}>{content}</div>
                </div>
            </div>
        </>
    );
};

export default Comment;