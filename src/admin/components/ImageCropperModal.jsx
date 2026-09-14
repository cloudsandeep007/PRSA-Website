import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Crop, Check, X, RefreshCw, ZoomIn } from 'lucide-react';

export default function ImageCropperModal({ imageSrc, onCropComplete, onCancel, defaultAspect = 1 }) {
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(defaultAspect);
  const imgRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 80,
        },
        aspect || 1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(initialCrop);
  }

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      if (newAspect) {
        setCrop(
          centerCrop(
            makeAspectCrop(
              { unit: '%', width: 80 },
              newAspect,
              width,
              height
            ),
            width,
            height
          )
        );
      }
    }
  };

  const getCroppedImgFile = async () => {
    if (!imgRef.current || !completedCrop) return null;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        const croppedFile = new File([blob], `cropped-${Date.now()}.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        resolve(croppedFile);
      }, 'image/jpeg', 0.92);
    });
  };

  const handleSaveCrop = async () => {
    setProcessing(true);
    try {
      const croppedFile = await getCroppedImgFile();
      if (croppedFile) {
        await onCropComplete(croppedFile);
      }
    } catch (err) {
      console.error('Crop error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-primary">Crop & Align Photo</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aspect Ratio Preset Selector */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-high/60 p-2.5 rounded-xl border border-outline-variant/20">
          <span className="text-xs font-bold text-on-surface-variant mr-1">Aspect Ratio:</span>
          
          <button
            type="button"
            onClick={() => handleAspectChange(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              aspect === 1 ? 'bg-primary-container text-on-primary-container shadow' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            Square (1:1) — Coaches & Avatars
          </button>

          <button
            type="button"
            onClick={() => handleAspectChange(16 / 9)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              aspect === 16 / 9 ? 'bg-primary-container text-on-primary-container shadow' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            Wide (16:9) — Programs & Events
          </button>

          <button
            type="button"
            onClick={() => handleAspectChange(4 / 3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              aspect === 4 / 3 ? 'bg-primary-container text-on-primary-container shadow' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            Standard (4:3)
          </button>

          <button
            type="button"
            onClick={() => handleAspectChange(undefined)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              aspect === undefined ? 'bg-primary-container text-on-primary-container shadow' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            Freeform
          </button>
        </div>

        {/* Crop Area */}
        <div className="flex-1 min-h-[250px] max-h-[450px] bg-black/40 rounded-xl p-2 flex items-center justify-center overflow-auto border border-outline-variant/30">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            className="max-h-[400px]"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop target"
              onLoad={onImageLoad}
              className="max-h-[380px] w-auto object-contain rounded-lg"
            />
          </ReactCrop>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3">
          <div className="text-[11px] text-on-surface-variant">
            Drag edges to crop. Photos will be aligned automatically.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-surface-container-high text-xs font-bold text-on-surface"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={processing}
              onClick={handleSaveCrop}
              className="px-5 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-cyan-400 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{processing ? 'Processing & Uploading...' : 'Crop & Save Photo'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
