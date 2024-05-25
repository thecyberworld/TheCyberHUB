import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { CodeContainer } from "./EncoderCodeElement";

const CopyButton = styled.button`
    padding: 5px 10px;
    background-color: #ff6b08;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
`;

function EncoderCode(props) {
    function Base64() {
        return btoa(props.Input);
    }

    function Url() {
        return encodeURIComponent(props.Input);
    }

    function fullURLEncode(url) {
        let encodedURL = encodeURI(url);
        const urlComponents = encodedURL.split("?");

        // Encode individual query parameters
        if (urlComponents.length > 1) {
            const queryString = urlComponents[1];
            const encodedQueryString = queryString
                .split("&")
                .map(function (param) {
                    const pair = param.split("=");
                    return encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]);
                })
                .join("&");

            encodedURL = urlComponents[0] + "?" + encodedQueryString;
        }

        return encodedURL;
    }

    function asciiHexEncode(inputString) {
        let hexEncoded = "";

        for (let i = 0; i < inputString.length; i++) {
            const charCode = inputString.charCodeAt(i);
            const hexValue = charCode.toString(16).toUpperCase();
            hexEncoded += ("00" + hexValue).slice(-2); // Ensure two digits per character
        }

        return hexEncoded;
    }

    function htmlEncode(inputString) {
        return inputString.replace(/[\u00A0-\u9999<>]/gim, function (i) {
            return "&#" + i.charCodeAt(0) + ";";
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Copied to clipboard!");
        });
    }

    return (
        <div>
            <h1>Base64 Encode</h1>
            <CodeContainer>
                <p>{Base64()}</p>
                <CopyButton onClick={() => copyToClipboard(Base64())}>Copy</CopyButton>
            </CodeContainer>

            <h1>Url Encode</h1>
            <CodeContainer>
                <p>{Url()}</p>
                <CopyButton onClick={() => copyToClipboard(Url())}>Copy</CopyButton>
            </CodeContainer>

            <h1>Full Url Encode</h1>
            <CodeContainer>
                <p>{fullURLEncode(props.Input)}</p>
                <CopyButton onClick={() => copyToClipboard(fullURLEncode(props.Input))}>Copy</CopyButton>
            </CodeContainer>

            <h1>ASCII HEX Encode</h1>
            <CodeContainer>
                <p>{asciiHexEncode(props.Input)}</p>
                <CopyButton onClick={() => copyToClipboard(asciiHexEncode(props.Input))}>Copy</CopyButton>
            </CodeContainer>

            <h1>HTML Encode</h1>
            <CodeContainer>
                <p>{htmlEncode(props.Input)}</p>
                <CopyButton onClick={() => copyToClipboard(htmlEncode(props.Input))}>Copy</CopyButton>
            </CodeContainer>
        </div>
    );
}

export default EncoderCode;
