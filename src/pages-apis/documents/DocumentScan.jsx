import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotoGallery } from '../../hooks/usePhotoGallery';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/last_logo.png';

const ScanDocumentPage = () => {
    const { userId, accessToken } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { takePhoto } = usePhotoGallery();


    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
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

    const handleCameraCapture = async () => {
        const photoData = await takePhoto();
        if (photoData) {
            const response = await fetch(photoData.webPath);
            const blob = await response.blob();
            const file = new File([blob], 'captured_image.jpg', { type: blob.type });
            handleScan(file);
        }
    };

    return (
        <div className="document-scan-container">
            <img src={logo} alt="" />
            <h2>Smart Scanner</h2>

            <button
                className="btn-scanner"
                onClick={handleCameraCapture}
            >
                <i className="fa-solid fa-camera"></i> Use Camera
            </button>

            <div>
                <button
                    className="btn-upload"
                    onClick={() => fileInputRef.current.click()}
                >
                    <i className="fa-solid fa-upload"></i> Upload Picture
                </button>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default ScanDocumentPage;
