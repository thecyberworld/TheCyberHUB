import React, { useState } from "react";
import {
    CopyToClipboardButton,
    GenerateButton,
    IsStrongText,
    PassGenCard,
    PassGenContainer,
    PassGenForm,
    PassGenHeading,
    PassGenOptionsContainer,
    PassGenPasswordContainer,
    PasswordDisplay,
    PasswordDisplayContainer,
} from "./PassGenElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { toast } from "react-toastify";
import HeadingBanner from "../../Common/HeadingBanner/HeadingBanner";

const PassGen = () => {
    const [password, setPassword] = useState("7h3cyb3rw04ld (0mmun17y");
    const [options, setOptions] = useState({
        length: 16,
        includeNumbers: true,
        includeSymbols: true,
        includeUppercase: true,
        includeLowercase: true,
    });

    const generatePassword = (e) => {
        e.preventDefault();
        const { length, includeNumbers, includeSymbols, includeUppercase, includeLowercase } = options;

        const numbers = includeNumbers ? "0123456789" : "";
        const symbols = includeSymbols ? "!@#$%^&*()_-+=<>?" : "";
        const lowercase = includeLowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
        const uppercase = includeUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";

        const requiredSymbolCount = 8;
        const totalLength = length;
        const symbolIndices = new Set();

        // Ensure at least 6 symbols in the password
        while (symbolIndices.size < requiredSymbolCount) {
            const randomIndex = Math.floor(Math.random() * totalLength);
            symbolIndices.add(randomIndex);
        }

        const passwordArray = Array.from({ length: totalLength }, (_, index) => {
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

    const handleOptionsChange = (event) => {
        const { name, value, type, checked } = event.target;
        setOptions((prevOptions) => ({
            ...prevOptions,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <Wrapper>
            <PassGenContainer>
                <HeadingBanner heading={"Password Generator"} />
                <PassGenCard>
                    <PassGenOptionsContainer>
                        <PassGenHeading>Options</PassGenHeading>
                        <div>
                            <span> Length </span>
                            <input
                                className={"range"}
                                type="range"
                                name="length"
                                min="6"
                                max="30"
                                value={options.length}
                                onChange={handleOptionsChange}
                            />
                            <span>{options.length}</span>
                        </div>
                        <div>
                            <label>
                                Numbers
                                <input
                                    type="checkbox"
                                    name="includeNumbers"
                                    checked={options.includeNumbers}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                            <label>
                                Symbols
                                <input
                                    type="checkbox"
                                    name="includeSymbols"
                                    checked={options.includeSymbols}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Uppercase
                                <input
                                    className={".checkbox"}
                                    type="checkbox"
                                    name="includeUppercase"
                                    checked={options.includeUppercase}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                            <label>
                                Lowercase
                                <input
                                    type="checkbox"
                                    name="includeLowercase"
                                    checked={options.includeLowercase}
                                    onChange={handleOptionsChange}
                                />
                            </label>
                        </div>
                    </PassGenOptionsContainer>

                    <PassGenPasswordContainer>
                        <PassGenHeading>Password</PassGenHeading>

                        <PassGenForm>
                            <PasswordDisplayContainer>
                                <PasswordDisplay> {password} </PasswordDisplay>
                                <CopyToClipboardButton onClick={copyPassword} />
                            </PasswordDisplayContainer>

                            <IsStrongText isStrong={isPasswordStrong()}>
                                {isPasswordStrong() ? "Strong" : "Weak"}
                            </IsStrongText>
                            <GenerateButton onClick={generatePassword}>Generate</GenerateButton>
                        </PassGenForm>
                    </PassGenPasswordContainer>
                </PassGenCard>
            </PassGenContainer>
        </Wrapper>
    );
};

export default PassGen;
