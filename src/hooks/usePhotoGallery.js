import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export function usePhotoGallery() {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    try {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      setPhoto(cameraPhoto.webPath);
      return cameraPhoto;
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return {
    photo,
    takePhoto,
  };
}
