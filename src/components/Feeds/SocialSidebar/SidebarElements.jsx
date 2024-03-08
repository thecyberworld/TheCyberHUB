import styled from "styled-components";

export const SidebarContainer = styled.div`
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    top: 100px;

    width: 100%;
    max-width: 400px;
    min-width: ${(props) => (props.sidebarType === "explore" ? "300px" : "400px")};

    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;
