import styled from "styled-components";
import { AiFillClockCircle, AiOutlineCloseCircle, AiFillExclamationCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BiSolidChevronDown, BiSend, BiUserPlus, BiSolidChevronUp } from "react-icons/bi";

export const ParentContainer = styled.div`
    margin: 6.25rem auto;
    width: 100%;
    color: #f5f5f5;
    padding: 0 1.563rem;
`;

export const Container = styled.div`
    width: 80%;
    margin: 3rem auto;
`;

export const Header = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
`;

export const SubHeader = styled.p`
    font-size: 1rem;
    margin-bottom: 2.5rem;
    color: gray;
`;

export const Tabs = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2.5rem;
    background-color: #ffffff;
    width: fit-content;
    border-radius: 8px;
    padding: 0.5rem;

    button {
        padding: 0.75rem 2.5rem;
        border: none;
        background-color: transparent;
        cursor: pointer;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        text-transform: capitalize;

        &:hover {
            background-color: #ddd;
        }

        &.active {
            background-color: #ddd;
        }
    }
`;

export const NoDataComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;

    img {
        margin-top: 2rem;
        width: 300px;
        height: 300px;
    }
`;

const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        width: 20px;
        height: 20px;
    `;
};

export const AiFillClockCircleIcon = createStyledIcon(AiFillClockCircle);
export const MdLocationOnIcon = createStyledIcon(MdLocationOn);
export const BiChevronDownIcon = createStyledIcon(BiSolidChevronDown);
export const BiSolidChevronUpIcon = createStyledIcon(BiSolidChevronUp);
export const BiSendIcon = createStyledIcon(BiSend);
export const BiUserPlusIcon = createStyledIcon(BiUserPlus);
export const AiOutlineCloseCircleIcon = createStyledIcon(AiOutlineCloseCircle);
export const AiFillExclamationCircleIcon = createStyledIcon(AiFillExclamationCircle);
