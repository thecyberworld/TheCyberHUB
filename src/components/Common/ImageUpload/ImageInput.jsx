import React from "react";
import { AddImage, ImageUploadLabel } from "./ImageElements";
import CompressImage from "./CompressImage";

const ImageInput = ({
    inputName,
    onChange,
    labelStyles = {},
    filesName,
    multiple = false,
    maxMultiple = 4,
    labelPlaceholder = undefined,
    onAddImages,
    resizeImage,
}) => {
    const shouldShowAddImage = !multiple || (multiple && filesName.length < maxMultiple);
    console.log(filesName);
    return (
        <div key={!multiple && filesName[0]}>
            <ImageUploadLabel style={labelStyles} htmlFor={inputName}>
                {shouldShowAddImage && <AddImage />}
                {labelPlaceholder &&
                    (!filesName.length ? (
                        <p>{labelPlaceholder.choose}</p>
                    ) : (
                        filesName.map((fileName) => {
                            return <p key={fileName}>{fileName.slice(0, 20)}</p>;
                        })
                    ))}
            </ImageUploadLabel>

            <input
                type="file"
                name={inputName}
                id={inputName}
                onChange={onChange}
                accept="image/*"
                multiple={multiple}
                style={{ display: "none" }}
            />
            {resizeImage && <CompressImage resizeImage={resizeImage} pageName="feed" onAddImages={onAddImages} />}
        </div>
    );
};
export default ImageInput;
