// In WebSecurity.js
import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { WebSecurityContainer } from "./WebSecurityElements";

const WebSecurity = () => {
    return (
        <Wrapper style={{ marginTop: "90px" }}>
            <WebSecurityContainer></WebSecurityContainer>
        </Wrapper>
    );
};

export default WebSecurity;
