import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { CardToolHeading, CardTools, ContainerTools, RouterLink } from "./ToolsElements";

import { RiEarthFill } from "react-icons/ri";
import { GiNautilusShell } from "react-icons/gi";

const Tools = () => {
    return (
        <Wrapper>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontSize: "30px",
                    color: "#f5f5f5",
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: "bold",
                    margin: "50px 0 50px",
                }}
            >
                Sec Tools
            </div>
            <ContainerTools>
                <RouterLink to={"/tools/subfinder"}>
                    <CardTools>
                        <CardToolHeading>
                            <RiEarthFill /> Sub Finder
                        </CardToolHeading>
                    </CardTools>
                </RouterLink>
                <RouterLink to={"/tools/breachcheck"}>
                    <CardTools>
                        <CardToolHeading>
                            <RiEarthFill /> Breach Check
                        </CardToolHeading>
                    </CardTools>
                </RouterLink>
                {/* <RouterLink to={"portScanner"}> */}
                {/*    <CardTools> */}
                {/*        <CardToolHeading> */}
                {/*            <CgOpenCollective/> Port Scanner */}
                {/*        </CardToolHeading> */}
                {/*    </CardTools> */}
                {/* </RouterLink> */}
                <RouterLink to={"/tools/revshell"}>
                    <CardTools>
                        <CardToolHeading>
                            <GiNautilusShell /> Rev Shell
                        </CardToolHeading>
                    </CardTools>
                </RouterLink>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
