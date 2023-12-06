import React from 'react';
import Header from "../main/Header";
import Footer from "../main/Footer";
import MessageRoom from "../message/MessageRoom";

const ProductDetail = () => {
    return (
        <div>
            <Header/>
            <div style={{width:1000, height:500}}>
                <MessageRoom userId={1} topic={"messageRoom1"} nickName={"Jongin"} roomNo={1}/>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProductDetail;