import React from 'react';
import { Modal } from 'react-bootstrap';

const ImageDetail = ({ show, onClose, selectedPhotoInfo }) => {
    console.log('Selected Photo Info:', selectedPhotoInfo);


    if (!selectedPhotoInfo) {
        // 선택된 이미지 정보가 없을 경우 모달을 렌더링하지 않음
        return null;
      }
    
    // 선택된 이미지 정보
    const { createdAt, modifiedAt, id, photoTitle, photoContent, 
            photoLink, photoLike, hit, somoimPhoto, somoim } = selectedPhotoInfo;

    const photoArray = somoimPhoto.replace(/"/g, '').split(',');
    
    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>제목 : <strong>{photoTitle}</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center" >
                <div className="col-8" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {photoArray.map((photo, index) => (
                        <img
                            key={index}
                            src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${photo}`}
                            alt={`somoimPhoto-${index}`}
                            style={{ width: '50%', marginBottom: '10px' }}
                        />
                    ))}
                </div>
                <div className="col-4" >
                    <strong>내용 :</strong><br/>
                    <div dangerouslySetInnerHTML={{ __html: photoContent }} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                Link : <a href={photoLink} target="_blank" rel="noopener noreferrer">{photoLink}</a>
            </Modal.Footer>      
        </Modal>
      );
    };

export default ImageDetail;