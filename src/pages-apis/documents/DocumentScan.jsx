import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/last_logo.png';

const ScanDocumentPage = () => {
    const { userId, accessToken } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
            setFile(file);
            setImagePreview(URL.createObjectURL(blob));
            setIsCameraOpen(false);
            video.srcObject.getTracks().forEach(track => track.stop());
            handleScan(file);
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));

            handleScan(selectedFile);
        }
    };

    const handleScan = async (fileToScan) => {
        if (!fileToScan) {
            alert('Please select or capture an image.');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileToScan);

        try {
            const response = await fetch(`https://api.seai.co/api/v1/users/${userId}/ocr`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const documentData = await response.json();
                navigate(`/documents/${documentData.id}/verify`, { state: { documentData } });
            } else {
                alert('Failed to scan the document.');
            }
        } catch (error) {
            console.error('Error scanning the document:', error);
        }
    };

    return (
        <div className='document-scan-container'>
            <img src={logo} alt="" />
            <h2>Smart Scanner</h2>

            <button className='btn-scanner' onClick={openCamera}>
            <i class="fa-solid fa-camera"></i> Use Camera
            </button>

            {isCameraOpen && (
                <div className="camera-container">
                    <video ref={videoRef} autoPlay className="camera-view" />
                    <button className='btn-scanner' onClick={capturePhoto}>
                    <i class="fa-solid fa-bolt"></i> Take Photo
                    </button>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
            )}

            <div>
                <button className='btn-scanner' onClick={() => fileInputRef.current.click()}>
                <i class="fa-solid fa-upload"></i> Upload Picture    
                </button>
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }} // Hide the actual input field
                />
            </div>
        </div>
    );
};

export default ScanDocumentPage;
