// In WebSecurity.js
import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { WebSecurityContainer } from "./WebSecurityElements";

const WebSecurity = () => {
    return (
        <Wrapper style={{ marginTop: "90px" }}>
            <WebSecurityContainer>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            padding: "50px",
                            border: "1px solid grey",
                            borderRadius: "10px",
                        }}
                    >
                        Topics
                    </div>
                    <div
                        style={{
                            display: "flex",
                            padding: "50px",
                            border: "1px solid grey",
                            borderRadius: "10px",
                        }}
                    >
                        Labs
                    </div>
                </div>
            </WebSecurityContainer>
        </Wrapper>
    );
};

export default WebSecurity;
