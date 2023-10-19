import React from "react";
import { MessageInputContainer, Message, Input, InputGroup } from "./ChatElement";
import { BiSend } from "react-icons/bi";

const SendMessage = () => {
    return (
        <MessageInputContainer>
            <Message>
                <Input placeholder="Write Message Here" />
                <InputGroup>
                    <BiSend />
                </InputGroup>
            </Message>
        </MessageInputContainer>
    );
};

export default SendMessage;
