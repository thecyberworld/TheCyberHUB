import { useState } from "react";
import { toast } from "react-toastify";

const useUploadImages = ({ maxImageSizeByte, pageName, defaultImages = [] }) => {
    const [images, setImages] = useState(defaultImages || []);
    const [imagesName, setImagesName] = useState([]);

    const handleValidate = (image, maxSizeByte) => {
        if (!image) return;
        if (!image.type.startsWith("image/") && !["image/png", "image/jpeg", "image/jpg"].includes(image.type)) {
            toast.error("Invalid image type. Only png, jpeg and jpg are allowed.");
            return;
        }
        if (image.size > maxSizeByte) {
            toast.error(`Image size should be less than ${maxSizeByte / 1000}KB.`);
            return;
        }
        return image;
    };

    const handleUploadImage = (image) => {
        if (!handleValidate(image, maxImageSizeByte)) return;
        const imageName = `${pageName}-${Date.now()}.${image?.type.split("/")[1]}`;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({ image: new File([reader.result], imageName, { type: image?.type }), imageName });
            };
            reader.readAsArrayBuffer(image);
        });
    };

    const handleOneOrManyUploads = async (imageFiles) => {
        const manyImages = [];
        const manyImagesName = [];
        try {
            if (imageFiles?.length === 1) {
                const { image, imageName } = await handleUploadImage(imageFiles[0]);
                manyImages.push(image);
                manyImagesName.push(imageName);
            } else {
                for (const imageFile of imageFiles) {
                    const { image, imageName } = await handleUploadImage(imageFile);
                    manyImages.push(image);
                    manyImagesName.push(imageName);
                }
            }
            setImages((prevImages) => [...prevImages, ...imageFiles]);
            setImagesName((prevImagesName) => [...prevImagesName, ...manyImagesName]);
        } catch (error) {
            console.log(`Error uploading this image:${error}`);
        }
    };

    const handleRemove = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const handleChange = async (e) => {
        const imageFiles = e.target.files;
        await handleOneOrManyUploads(imageFiles);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        const imageFiles = e.dataTransfer.files;
        await handleOneOrManyUploads(imageFiles);
    };

    const handlePaste = async (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        const imageFiles = [];

        // Check if the paste event contains an image
        for (const item of items) {
            if (item.type.startsWith("image")) {
                const file = item.getAsFile();
                return imageFiles.push[file];
            }
        }

        await handleOneOrManyUploads(imageFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = () => {};

    return {
        images,
        setImages,
        imagesName,
        setImagesName,
        onImageRemove: handleRemove,
        onImageChange: handleChange,
        onImageDrop: handleDrop,
        onImagePaste: handlePaste,
        onImageDragOver: handleDragOver,
        onImageSubmit: handleSubmit,
    };
};
export default useUploadImages;
