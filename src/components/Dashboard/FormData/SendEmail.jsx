import React, { useState } from "react";
import axios from "axios";
import getApiUrl from "../../../features/apiUrl";
import {
    ContactFormInput,
    ContactFormLabel,
    ContactFormSection,
    ContactFormSubmit,
    ContactFormTextArea,
    CoverRight,
    EmailIcon,
    ErrorMessage,
    MessageIcon,
    OrgIcon,
} from "../../ContactForm/ContactFormElements";
import { toast } from "react-toastify";

const SendEmail = (props) => {
    const [emailData, setEmailData] = useState({
        email: "",
        subject: "",
        message: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);
    const handleChange = (e) => {
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setError2(false);
        setIsSuccess(false);

        const token = JSON.parse(localStorage.getItem("user")).token;
        axios
            .post(getApiUrl("api/form/sendEmail"), emailData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data.message === "Email sent successfully") {
                    console.log(response.data.message);
                    setIsSuccess(true);
                    setError(false);
                    setError2(false);
                }
                console.log(response.data.message);
                if (response.data.message === "Something went wrong. Please try again later.") {
                    setError2(true);
                    setIsSuccess(false);
                }
            })
            .catch((error) => {
                if (error.message === "Network Error") {
                    setError2(true);
                    setIsSuccess(false);
                } else if (error.response.status === 429) {
                    toast.error("Please wait 1 Minute before submitting again");
                    setIsSuccess(false);
                } else {
                    setError2(true);
                    setIsSuccess(false);
                }
            });
        if (isSuccess && !error2) {
            setEmailData({
                email: "",
                subject: "",
                message: "",
            });
        }
    };

    return (
        <div>
            <ContactFormSection onSubmit={handleSubmit}>
                <CoverRight>
                    <ContactFormLabel htmlFor="name">
                        <EmailIcon />
                    </ContactFormLabel>
                    <ContactFormInput
                        type="email"
                        name="email"
                        id="email"
                        value={emailData.email}
                        onChange={handleChange}
                        placeholder={"Email"}
                    />
                </CoverRight>
                <CoverRight>
                    <ContactFormLabel htmlFor="name">
                        <OrgIcon />
                    </ContactFormLabel>
                    <ContactFormInput
                        type="text"
                        name="subject"
                        id="subject"
                        value={emailData.subject}
                        onChange={handleChange}
                        placeholder={"Subject"}
                    />
                </CoverRight>
                <CoverRight>
                    <ContactFormLabel htmlFor="name">
                        <MessageIcon />
                    </ContactFormLabel>
                    <ContactFormTextArea
                        type="text"
                        name="message"
                        id="message"
                        value={emailData.message}
                        onChange={handleChange}
                        placeholder={"Subject"}
                    />
                </CoverRight>
                {/* {!isSuccess ? ( */}
                <ContactFormSubmit type="submit" value="submit" placeholder={"Submit"}>
                    Submit
                </ContactFormSubmit>
                {/* ) : null} */}

                {error && !isSuccess && <ErrorMessage>{"Please fill all of the fields"}</ErrorMessage>}
                {error2 && !isSuccess && <ErrorMessage>{"Server Error - Please contact us on discord"}</ErrorMessage>}
            </ContactFormSection>
            {/* {isSuccess && !error ? <GlowingButton>Submit Successfully</GlowingButton> : null} */}
        </div>
    );
};

export default SendEmail;
