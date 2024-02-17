import React from "react";
import { SubmissionBoxContainer, SubmitButton, Input, InputSection } from "./SubmissionBoxElements";
import { PiUploadDuotone } from "react-icons/pi";

const SubmissionBox = ({ submitType }) => {
    return (
        <SubmissionBoxContainer>
            <InputSection>
                <Input placeholder={`Enter your ${submitType} here`} />
                <SubmitButton>
                    <PiUploadDuotone size={26} />{" "}
                </SubmitButton>
            </InputSection>
        </SubmissionBoxContainer>
    );
};

export default SubmissionBox;
