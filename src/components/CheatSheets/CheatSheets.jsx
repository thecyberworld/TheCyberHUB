import React from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import HeadingBanner from "../Common/HeadingBanner/HeadingBanner";
import { GiLaptop } from "react-icons/gi";
import { CardTool, CardToolHeading, CardTools, ContainerTools, RouterLink, ToolIcon } from "../Tools/ToolsElements";
import { FaLinux, FaWindows } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const CheatSheets = () => {
    const tools = [
        { name: "Hacking", link: "/cheatsheets/hacking", icon: <GiLaptop /> },
        { name: "Security", link: "/cheatsheets/security", icon: <MdSecurity /> },
        { name: "Linux", link: "/cheatsheets/linux", icon: <FaLinux /> },
        { name: "Windows", link: "/cheatsheets/windows", icon: <FaWindows /> },
    ];
    return (
        <Wrapper>
            <ContainerTools>
                <HeadingBanner heading={"Cheat Sheets"} />
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

export default CheatSheets;
