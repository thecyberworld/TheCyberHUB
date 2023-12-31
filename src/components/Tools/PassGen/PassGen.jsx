import React, { useState } from "react";
import {
    CopyToClipboardButton,
    GenerateButton,
    PassGenContainer,
    PassGenHeading,
    PasswordDisplay,
    PasswordDisplayContainer,
} from "./PassGenElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { toast } from "react-toastify";

const PassGen = () => {
    const [password, setPassword] = useState("");
    const generatePassword = () => {
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_-+=<>?";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const requiredSymbolCount = 8;
        const length = 16; // Adjust the total length of the password as needed
        const symbolIndices = new Set();

        // Ensure at least 6 symbols in the password
        while (symbolIndices.size < requiredSymbolCount) {
            const randomIndex = Math.floor(Math.random() * length);
            symbolIndices.add(randomIndex);
        }

        const passwordArray = Array.from({ length }, (_, index) => {
            if (symbolIndices.has(index)) {
                // Use a symbol if the index is in symbolIndices
                return symbols[Math.floor(Math.random() * symbols.length)];
            } else {
                // Use a random character from numbers + lowercase + uppercase
                const charset = numbers + lowercase + uppercase;
                return charset[Math.floor(Math.random() * charset.length)];
            }
        });

        // Shuffle the passwordArray to randomize the positions of the symbols
        passwordArray.sort(() => Math.random() - 0.5);

        const newPassword = passwordArray.join("");
        setPassword(newPassword);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);

        toast("Copied to clipboard", {
            type: "success",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
    };

    const isPasswordStrong = () => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-=<>?]).{8,}$/;
        return strongRegex.test(password);
    };

    return (
        <Wrapper>
            <PassGenContainer>
                <PassGenHeading>PassGen</PassGenHeading>

                <span
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        gap: "5px",
                    }}
                >
                    <PasswordDisplayContainer>
                        <PasswordDisplay> {password} </PasswordDisplay>
                        <CopyToClipboardButton onClick={copyPassword} />
                    </PasswordDisplayContainer>
                    <PasswordDisplay isStrong={isPasswordStrong()}>
                        {isPasswordStrong() ? "Strong" : "Weak"}
                    </PasswordDisplay>
                </span>

                <GenerateButton onClick={generatePassword}>Generate</GenerateButton>
            </PassGenContainer>
        </Wrapper>
    );
};

export default PassGen;
