import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { CardTool, CardToolHeading, CardTools, ContainerTools, RouterLink, ToolIcon } from "./ToolsElements";
import { GoFileBinary } from "react-icons/go";
import { RiEarthFill } from "react-icons/ri";
import { GiNautilusShell } from "react-icons/gi";
import {
    MdPassword,
    // MdScreenSearchDesktop
} from "react-icons/md";
import { TbHash } from "react-icons/tb";
import HeadingBanner from "../Common/HeadingBanner/HeadingBanner";

const Tools = () => {
    const tools = [
        { name: "Rev Shell", desc: "Reverse Shell Generator", link: "/tools/revshell", icon: <GiNautilusShell /> },
        { name: "Sub Finder", link: "/tools/subfinder", icon: <RiEarthFill /> },
        { name: "Pass Gen", link: "/tools/passgen", icon: <MdPassword /> },
        { name: "Encoder", link: "/tools/encoder", icon: <TbHash /> },
        { name: "BinExploit", link: "/tools/binexploits", icon: <GoFileBinary /> },
        // { name: "Dorking", link: "/tools/dorking", icon: <MdScreenSearchDesktop  /> },

        // {name: "Breach Check", link: "/tools/breachcheck", icon: <RiEarthFill/>,},
        // {name: "Binary Exploits", link: "/tools/binaryexploitation", icon: <RiEarthFill/>,},
        // {name: "jwt Decoder", link: "/tools/jwtdecoder", icon: <RiEarthFill/>,},
        // {name: "Hash Cracker", link: "/tools/hashcracker", icon: <RiEarthFill/>,},
        // {name: "Port Scanner", link: "/tools/portScanner", icon: <RiEarthFill/>,},
    ];
    return (
        <Wrapper>
            <ContainerTools>
                <HeadingBanner heading={"Hacking Tools"} />
                <CardTools>
                    {tools.map((tool, index) => {
                        return (
                            <RouterLink to={tool.link} key={index}>
                                <CardTool>
                                    <ToolIcon>{tool.icon}</ToolIcon>
                                    <CardToolHeading>{tool.name}</CardToolHeading>
                                </CardTool>
                            </RouterLink>
                        );
                    })}
                </CardTools>
            </ContainerTools>
        </Wrapper>
    );
};

export default Tools;
