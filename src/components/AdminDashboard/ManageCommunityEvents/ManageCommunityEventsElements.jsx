import styled from "styled-components";
import { AiFillClockCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";
import { GoProjectSymlink } from "react-icons/go";

export const CommunityEventsContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: auto;
`;
const createStyledIcon = (IconComponent) => {
    return styled(IconComponent)`
        width: 20px;
        height: 20px;
    `;
};

export const AiFillClockCircleIcon = createStyledIcon(AiFillClockCircle);
export const MdLocationOnIcon = createStyledIcon(MdLocationOn);
export const BiUserPlusIcon = createStyledIcon(BiUserPlus);
export const AiOutlineCloseCircleIcon = createStyledIcon(AiOutlineCloseCircle);
export const GoProjectSymlinkIcon = createStyledIcon(GoProjectSymlink);
