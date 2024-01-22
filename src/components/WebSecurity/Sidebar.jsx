import React, { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
    // sticky sidebar
    position: sticky;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 400px;
    background: #1a1a1a;
    color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MainTitle = styled.h3`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

const DropdownContainer = styled.div`
    position: relative;
    margin-top: 10px;
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
    border: 1px solid #3a3a3a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
    padding: 5px;
    cursor: pointer;

    &:hover {
        background: #f1f1f1;
    }
`;

const Sidebar = ({ topics, onSelectSubtopic }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    return (
        <SidebarContainer>
            {topics.map((topic, index) => (
                <div key={topic.id}>
                    <MainTitle onClick={() => toggleDropdown(index)}>
                        {topic.title}
                        <span>{openDropdown === index ? "▲" : "▼"}</span>
                    </MainTitle>
                    <DropdownContainer>
                        <DropdownList isOpen={openDropdown === index}>
                            {topic.desc.map((subtopic) => (
                                <DropdownItem
                                    key={subtopic.title}
                                    onClick={() => {
                                        onSelectSubtopic(subtopic.title);
                                        // toggleDropdown(index);
                                    }}
                                >
                                    {subtopic.title}
                                </DropdownItem>
                            ))}
                        </DropdownList>
                    </DropdownContainer>
                </div>
            ))}
        </SidebarContainer>
    );
};

export default Sidebar;
