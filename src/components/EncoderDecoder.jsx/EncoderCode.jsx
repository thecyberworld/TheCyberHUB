import { CodeContainer, H1 } from "./EncoderCodeElement";
import React from "react";

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
    return (
        <div>
            <H1>Base64 Encode</H1>
            <CodeContainer>
                <p>{Base64()}</p>
            </CodeContainer>
            <H1>Url Encode</H1>
            <CodeContainer>{Url()}</CodeContainer>
            <H1>Full Url Encode</H1>
            <CodeContainer>{fullURLEncode(props.Input)}</CodeContainer>
            <H1>ASCII HEX Encode</H1>
            <CodeContainer>{asciiHexEncode(props.Input)}</CodeContainer>
            <H1>HTML Encode</H1>
            <CodeContainer>{htmlEncode(props.Input)}</CodeContainer>
        </div>
    );
}
export default EncoderCode;
