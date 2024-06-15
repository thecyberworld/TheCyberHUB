import { useState } from "react";
import { toast } from "react-toastify";
import { uploadImages } from "src/features/imageUploadService";

const useUploadImages = ({ maxImageSizeByte, pageName, initImages = [] }) => {
    const [images, setImages] = useState([]);
    const [imagesName, setImagesName] = useState(initImages || []);

    const handleValidate = (image, maxSizeByte) => {
        if (!image) return;
        const isImageValid =
            !image.type.startsWith("image/") && !["image/png", "image/jpeg", "image/jpg"].includes(image.type);
        if (isImageValid) {
            toast.error("Invalid image type. Only png, jpeg and jpg are allowed.");
            return;
        }
        if (image.size > maxSizeByte) {
            const maxSizeLog = niceBytes(maxSizeByte);
            toast.error(`Image size should be less than ${maxSizeLog}.`);
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
                resolve({
                    image: new File([reader.result], imageName, { type: image?.type }),
                    imageName: imageName.split("-")[1],
                });
            };
            reader.readAsArrayBuffer(image);
        });
    };

    const handleManyUploads = async (imageFiles, maxImages) => {
        const manyImages = [];
        const manyImagesName = [];
        try {
            for (const imageFile of imageFiles) {
                const { image, imageName } = await handleUploadImage(imageFile);
                manyImages.push(image);
                manyImagesName.push(imageName);
            }

            setImagesName((prevImagesName) => {
                const newImagesName = [...prevImagesName, ...manyImagesName];
                return maxImages ? newImagesName.slice(0, maxImages) : newImagesName;
            });
            setImages((prevImages) => {
                const newImages = [...prevImages, ...manyImages];
                return maxImages ? newImages.slice(0, maxImages - initImages.length) : newImages;
            });
        } catch (error) {
            console.log(`Error uploading this image:${error}`);
        }
    };

    const handleRemove = (index) => {
        setImages((prevImages) => removeItemAtIndex(prevImages, index));
        setImagesName((prevImagesName) => removeItemAtIndex(prevImagesName, index));
    };

    const handleMultipleSingularOptions = async (imageFiles, multiple, maxImages) => {
        if (multiple) return await handleManyUploads(imageFiles, maxImages);
        const { image, imageName } = await handleUploadImage(imageFiles[0]);
        setImages([image]);
        setImagesName([imageName]);
    };

    const handleChange = async (e, multiple = false, maxImages) => {
        const imageFiles = e.target.files;
        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handleDrop = async (e, multiple = false, maxImages) => {
        e.preventDefault();
        const imageFiles = e.dataTransfer.files || [];
        await handleMultipleSingularOptions(imageFiles, multiple, maxImages);
    };

    const handlePaste = async (e, multiple = false, maxImages) => {
        const pasteItems = e.clipboardData.files;
        await handleMultipleSingularOptions(pasteItems, multiple, maxImages);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        await uploadImages(formData);
    };

    const handleSubmitManyImages = async (files) => {
        const promises = files.map((file) => handleSubmit(file));
        await Promise.all(promises);
    };

    const handleSubmitFromContent = async (content) => {
        const imageTags = content.match(/<img[^>]*src="([^"]*)"[^>]*>/g) || [];
        let updatedContent = content;
        if (imageTags.length > 0) {
            updatedContent = await uploadContentImages(imageTags, updatedContent, pageName, handleSubmit);
        }
        return updatedContent;
    };

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
        onManyImageSubmit: handleSubmitManyImages,
        onImageFromContentSubmit: handleSubmitFromContent,
    };
};
export default useUploadImages;

async function uploadContentImages(imageTags, updatedContent, ...args) {
    const imageUrls = imageTags.map((tag) => {
        const match = tag.match(/src="([^"]*)"/);
        return match ? match[1] : null;
    });

    for (const imageUrl of imageUrls) {
        if (!isImageUrl(imageUrl)) {
            updatedContent = await uploadContentImage(imageUrl, updatedContent, ...args);
        }
    }
    return updatedContent;
}

async function uploadContentImage(imageUrl, updatedContent, pageName, onSubmit) {
    const [imageType, base64Data] = imageUrl.split(";base64,");
    const filename = `${pageName}-${Date.now()}.${imageType.split("/")[1]}`;

    const newFile = bufferToFile(base64Data, filename, imageType);

    await onSubmit(newFile);

    return updatedContent.replace(imageUrl, filename.split("-")[1]);
}

function isImageUrl(url) {
    return (
        url.startsWith("http://") || url.startsWith("https://") || url.replace(/^data:/, "").startsWith("data:image")
    );
}

function bufferToFile(base64Data, fileName, imageType) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = byteCharacters.split("").map((char) => char.charCodeAt());
    const uint8Array = new Uint8Array(byteNumbers);
    const blob = new Blob([uint8Array], { type: imageType });
    return new File([blob], fileName, { type: imageType.replace(/^data:/, "") });
}

function removeItemAtIndex(items, index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    return updatedItems;
}

const units = ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const niceBytes = (size) => {
    let unitNameIndex = 0;
    let number = parseInt(size, 10) || 0;

    while (number >= 1024 && ++unitNameIndex) {
        number = number / 1024;
    }

    return number.toFixed(number < 10 && unitNameIndex > 0 ? 1 : 0) + " " + units[unitNameIndex];
};
