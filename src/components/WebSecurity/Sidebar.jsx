import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const SidebarContainer = styled.div`
    position: sticky;
    top: 100px;
    height: 100%;
    width: 100%;
    max-width: 400px;
    background: #1a1a1a;
    color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MainTitle = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    color: #eeeeee;
`;

const DropdownContainer = styled.div`
    position: relative;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

// const DropdownButton = styled.button`
//   width: 100%;
//   padding: 5px;
//   cursor: pointer;
//   background: #111111;
//   border: 1px solid #3a3a3a;
//   text-align: left;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

const DropdownList = styled.div`
    width: 100%;
    background: #1a1a1a;
    //border: 1px solid #3a3a3a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
    cursor: pointer;
    border-radius: 8px;
    padding: 5px 10px;

    &:hover {
        background: #2d2d2d;
    }
`;
const VerticalLine = styled.div`
    border: 1px solid rgba(140, 140, 140, 0.4);
    height: 90%;
    width: fit-content;
    margin: 0 0 0 10px;
    padding: 10px 0;
    position: absolute;
`;

// const HorizontalLine = styled.div`
//   border-bottom: 1px solid #ffffff;
//   width: 100%;
// `;

const Sidebar = ({ topics, onSelectSubtopic, onlyCat }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    return (
        <SidebarContainer>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {/* {!onlyCat &&  <h1 style={{ */}
                {/*    color: "#ecf0f1", fontSize: "2em", textAlign: "center", */}
                {/* }}> */}
                {/*    {topic.category} */}
                {/* </h1>} */}
                {topics.map((topic, index) =>
                    !onlyCat ? (
                        <div key={topic.id}>
                            <MainTitle to={`/websecurity/topic/${topic.id}`} onClick={() => toggleDropdown(index)}>
                                {" "}
                                {topic.title}
                                <span>{openDropdown === index ? <FaAngleUp /> : <FaAngleDown />}</span>
                            </MainTitle>
                            <DropdownContainer>
                                {openDropdown === index && (
                                    <>
                                        <VerticalLine />
                                        <span></span>
                                    </>
                                )}
                                <DropdownList isOpen={openDropdown === index}>
                                    {topic.desc.map((subtopic) => (
                                        <DropdownItem
                                            key={subtopic.title}
                                            onClick={() => {
                                                onSelectSubtopic(subtopic.title);
                                                // toggleDropdown(index);
                                            }}
                                        >
                                            {" "}
                                            {subtopic.title}
                                        </DropdownItem>
                                    ))}
                                </DropdownList>
                            </DropdownContainer>
                        </div>
                    ) : (
                        <MainTitle onClick={() => toggleDropdown(index)}>
                            {topic.category}
                            <span>{openDropdown === index ? "▲" : "▼"}</span>
                        </MainTitle>
                    ),
                )}
            </div>
        </SidebarContainer>
    );
};

export default Sidebar;
