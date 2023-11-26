import React from 'react';
import Header from "../main/Header";
import Footer from "../main/Footer";
import MessageRoom from "../message/MessageRoom";

const ProductDetail = () => {
    return (
        <div>
            <Header/>
            <div className="px-10">
                <div style={{width:"50%"}}>
                    <MessageRoom userId={1} topic={"chat1"} nickname={"Jongin"} />
                </div>
                <div style={{width:"50%"}}>
                    <MessageRoom userId={2} topic={"chat1"} nickname={"Hyuna"} />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ProductDetail;