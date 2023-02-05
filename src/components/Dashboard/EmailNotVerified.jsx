import React, { useEffect, useState } from "react";
import { EmailNotVerifiedContainer, EmailNotVerifiedText, ResendButton } from "./EmailNotVerifiedElements";
import { useSelector } from "react-redux";
import axios from "axios";

const EmailNotVerified = () => {
    const { user } = useSelector((state) => state.auth);

    if (user) {
        const [message, setMessage] = useState("");

        const [timeLeft, setTimeLeft] = useState(60);
        const [isCounting, setIsCounting] = useState(false);

        useEffect(() => {
            let intervalId = null;
            if (isCounting) {
                intervalId = setInterval(() => {
                    setTimeLeft((timeLeft) => {
                        if (timeLeft <= 0) {
                            clearInterval(intervalId);
                            setIsCounting(false);
                            return 0;
                        }
                        return timeLeft - 1;
                    });
                }, 1000);
            }
            return () => clearInterval(intervalId);
        }, [isCounting]);

        const resendEmail = () => {
            setTimeLeft(60);
            setIsCounting(true);
            axios
                .post(
                    "http://localhost:5000/account/resend-verification-email",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    },
                )
                .then((res) => {
                    setMessage(res.data.message);
                    console.log(res.data.message);
                })
                .catch((error) => {
                    console.error(error.response.data.message);
                });
        };

        const isVerified = user.isVerified === "true";

        return (
            <EmailNotVerifiedContainer>
                {!isVerified ? (
                    <EmailNotVerifiedText>
                        Email Verification link has been sent, please verify it.
                        {!isCounting ? (
                            <ResendButton onClick={resendEmail}> Resend </ResendButton>
                        ) : (
                            <ResendButton> Retry after {timeLeft >= 0 ? timeLeft : 0} </ResendButton>
                        )}
                        {message && <div style={{ color: "cornflowerblue" }}>{message}</div>}
                    </EmailNotVerifiedText>
                ) : (
                    <></>
                )}
            </EmailNotVerifiedContainer>
        );
    }
};

export default EmailNotVerified;
