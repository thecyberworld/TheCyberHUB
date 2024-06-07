import React, { useEffect, useRef } from "react";
import { AddImage, ImageUploadLabel } from "./ImageElements";

const ImageInput = ({
    inputName,
    onChange,
    labelStyles = {},
    filesName,
    multiple = false,
    labelPlaceholder = "",
    resetRef = false,
}) => {
    const imageInputRef = useRef(null);

    useEffect(() => {
        if (resetRef) imageInputRef.current.value = "";
    }, [resetRef]);

    return (
        <>
            <ImageUploadLabel style={labelStyles} htmlFor={inputName}>
                <AddImage />
                {labelPlaceholder ? (
                    !filesName.length ? (
                        <>
                            Add Cover Image
                            <p> Please select an image </p>
                        </>
                    ) : (
                        <p>
                            {filesName.map((fileName) => {
                                return <>{fileName.slice(0, 20)}</>;
                            })}{" "}
                        </p>
                    )
                ) : (
                    <></>
                )}
            </ImageUploadLabel>

            <input
                type="file"
                name={inputName}
                id={inputName}
                ref={imageInputRef}
                onChange={onChange}
                accept="image/*"
                multiple={multiple}
                style={{ display: "none" }}
            />
        </>
    );
};
export default ImageInput;
