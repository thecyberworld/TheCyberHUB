import styled from "styled-components";
import { FcAddImage } from "react-icons/all";

export const SectionCreateBlog = styled.div`
    display: flex;
    flex-direction: column;
`;
export const CreateBlogContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 1200px;
`;
export const AddImage = styled(FcAddImage)`
    font-size: 25px;
    cursor: pointer;
`;
