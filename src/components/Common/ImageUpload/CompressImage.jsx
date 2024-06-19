import React, { useEffect, useRef } from "react";
import { bufferToFile } from "./useUploadImages";

const CompressImage = ({ resizeImage, requiredImageWidth = 400, onAddImages, pageName, requiredImageHeight = 0 }) => {
    const refCanvas = useRef("");

    useEffect(() => {
        const resizeImageFunc = () => {
            if (!refCanvas.current) return;
            const canvas = refCanvas.current;
            const ctx = canvas.getContext("2d");
            const image = new Image();
            image.src = URL.createObjectURL(resizeImage);
            image.onload = () => {
                const aspectRatio = requiredImageWidth / image.width;
                canvas.width = requiredImageWidth;
                canvas.height = requiredImageHeight > 0 ? requiredImageHeight : image.height * aspectRatio;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const newImageUrl = ctx.canvas.toDataURL("image/jpeg");
                const { newFile: newImageFile, fileName: newImageFileName } = bufferToFile(newImageUrl, pageName);
                onAddImages([newImageFile], [newImageFileName], false);
            };
        };
        resizeImageFunc();
        return () => (refCanvas.current = "");
    }, []);

    return <canvas style={{ display: "none" }} ref={refCanvas} />;
};
export default CompressImage;
