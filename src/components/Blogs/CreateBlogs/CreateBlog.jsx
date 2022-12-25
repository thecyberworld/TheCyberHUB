import React, { useState } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import {
    BlogFormCard,
    Cover,
    CreateBlogContainer,
    BlogFormInput,
    BlogFormSubmit,
    BlogFormTextArea,
    CoverLeft,
} from "./CreateBlogElements";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../features/blogs/blogSlice";

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const { title, content } = formData;
    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            title,
            content,
            // headerImage: '',
            // tags: ['',''],
        };

        dispatch(createBlog(blogData));
        setFormData({
            title: "",
            content: "",
        });
    };

    return (
        <Wrapper>
            <CreateBlogContainer>
                <form onSubmit={onSubmit}>
                    <BlogFormCard>
                        {/* <Cover> */}
                        {/*    <BlogFormLabel htmlFor="addHeaderImage"> */}
                        {/*        Header Image <AddImage/> */}
                        {/*    </BlogFormLabel> */}
                        {/*    <input id="addHeaderImage" type="file" style={{display: "none"}}/> */}
                        {/* </Cover> */}
                        <Cover>
                            <CoverLeft>
                                <BlogFormInput
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={onChange}
                                    autoFocus={true}
                                    placeholder={"Title"}
                                />
                            </CoverLeft>
                        </Cover>

                        <CoverLeft>
                            <BlogFormTextArea
                                type="text"
                                name="content"
                                id="content"
                                value={content}
                                onChange={onChange}
                                placeholder={"content"}
                            />
                        </CoverLeft>
                        <BlogFormSubmit type="submit">Submit</BlogFormSubmit>
                    </BlogFormCard>
                </form>
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default CreateBlog;
