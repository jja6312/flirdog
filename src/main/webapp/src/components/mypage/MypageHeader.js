import React, { useState } from 'react';

import TableCss from '../../css/date/dateWrite.module.css';
const MypageHeader = () => {

    return (
        <div>
            &nbsp;&nbsp;&nbsp;
                          <div className={`d-flex justify-content-left`}>
                                            <input id='genderBox1' type='radio' name='gender'  value='남아' />
                                            <label className={TableCss.labelClass1} htmlFor='genderBox1'>남 아</label>
                                            &nbsp;&nbsp;
                                            <input id='genderBox2' type='radio' name='gender'  value='여아' />
                                            <label className={TableCss.labelClass2} htmlFor='genderBox2'>여 아</label>
                          </div>
        </div>
    );
};

export default MypageHeader;