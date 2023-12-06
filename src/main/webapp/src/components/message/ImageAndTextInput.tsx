import React, { useState, useRef } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';

type ImageAndTextInputProps = {
    messageInput: string;
    onImageUpload: (imageFile: File) => void;
    onTextChange: (text: string) => void;
    onSendMessage: () => void;
};

const ImageAndTextInput: React.FC<ImageAndTextInputProps> = ({ messageInput, onImageUpload, onTextChange, onSendMessage }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setShowModal(true);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            setSelectedImage(file);
            setShowModal(true);
        }
    };

    const handleImageUpload = () => {
        if (selectedImage) {
            onImageUpload(selectedImage); // props로 받은 onImageUpload 함수를 호출
            setSelectedImage(null); // 이미지 선택 상태를 초기화
            setShowModal(false); // 모달을 닫음
        }
    };

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{ width: '100%', border: '1px solid #ccc', padding: '10px' }}
        >
            <FormControl
                style={{ flexGrow: 1, marginBottom: '10px' }}
                value={messageInput}
                placeholder="메시지를 입력하세요"
                onChange={(e) => onTextChange(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    variant="outline-secondary"
                    onClick={() => fileInputRef.current?.click()}
                >
                    파일 선택
                </Button>
                <Button
                    variant="primary"
                    onClick={onSendMessage}
                    style={{ marginRight: '10px' }}
                >
                    전송
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>이미지 업로드 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            style={{ maxWidth: '100%' }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleImageUpload}>
                        업로드
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ImageAndTextInput;
