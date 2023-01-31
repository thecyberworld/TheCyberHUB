import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { encodeURL } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import PreviewBlogContent from "../../PreviewBlogContent";
import { getAllBlogs, reset, updateBlog } from "../../../../features/blogs/blogSlice";
import {
    AddCoverImageSection,
    AddImage,
    CreateBlogContainer,
    Form,
    ImageUploadAndPreviewSection,
    ImageUploadLabel,
    Input,
    SectionCreateBlog,
    Submit,
    TagInput,
    TextArea,
} from "../CreateBlog/CreateBlogElements";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { Button, PreviewIcon, PreviewSection } from "../../../Beta/Forum/ForumSubPageElements";
import { CircleSpinner } from "react-spinners-kit";
// import getApiUrl from "../../../../features/apiUrl";
// import axios from "axios";

const EditBlog = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        tags: [],
    });

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => dispatch(reset());
    }, [dispatch, isError, message]);

    if (isLoading) return <CircleSpinner size={20} color={"#1fc10d"} />;

    const { title } = useParams();
    const blog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase()) || {
        tags: [],
    };

    const onPreview = () => setPreview(true);
    const closePreview = () => setPreview(false);

    const onChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "tags") {
            value = value.split(",").map((tag) => tag.trim());
        }
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        const tagData = blogData.tags.length === 0 ? blog.tags : blogData.tags;

        const updatedBlogData = {
            title: blogData.title || blog.title,
            content: blogData.content || blog.content,
            tags: tagData,
        };

        dispatch(updateBlog({ id: blog._id, blogData: updatedBlogData }));
        navigate("../");
    };

    console.log(blogData.tags.length !== 0 ? blogData.tags : blog.tags);
    console.log(blogData.tags || blog.tags);
    console.log(blogData.tags);
    console.log(blog.tags);

    return (
        <Wrapper>
            <ImageUploadAndPreviewSection>
                <AddCoverImageSection>
                    <ImageUploadLabel style={{ color: "grey" }} htmlFor="addCoverImage">
                        <AddImage /> Updating Cover Image is not Implemented yet
                        {/* {!fileName ? <> Add Cover Image </> : */}
                        {/*    !preview && (!fileName && <ImageSelected> Please select an image </ImageSelected> */}
                        {/*    )} */}
                        {/* <ImageSelected> {file && <p>{fileName} selected</p>} </ImageSelected> */}
                    </ImageUploadLabel>
                    {/* <ImageUploadInput */}
                    {/*    type="file" name="addCoverImage" id="addCoverImage" */}
                    {/*    // onChange={onFileChange} */}
                    {/*    style={{display: "none"}} */}
                    {/* /> */}
                </AddCoverImageSection>

                <PreviewSection>
                    {!preview ? (
                        <Button onClick={onPreview}>
                            {" "}
                            <PreviewIcon /> Show Preview{" "}
                        </Button>
                    ) : (
                        <Button onClick={closePreview}>
                            {" "}
                            <PreviewIcon /> Close Preview{" "}
                        </Button>
                    )}
                </PreviewSection>
            </ImageUploadAndPreviewSection>
            {preview ? (
                <PreviewBlogContent
                    preview={preview}
                    closePreview={closePreview}
                    title={blogData.title || blog.title}
                    content={blogData.content || blog.content}
                    tags={blogData.tags.length !== 0 ? blogData.tags : blog.tags}
                />
            ) : (
                <CreateBlogContainer>
                    <SectionCreateBlog>
                        <Form onSubmit={onSubmit}>
                            <div>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={blogData.title || blog.title}
                                    onChange={onChange}
                                />
                                <TextArea
                                    name="content"
                                    id="content"
                                    value={blogData.content || blog.content}
                                    onChange={onChange}
                                />
                                <TagInput
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    value={blogData.tags.join(", ") || blog.tags.join(", ")}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <Submit type="submit" className="btn btn-primary">
                                    Update Blog
                                </Submit>
                                <Submit type="button" className="btn btn-secondary" onClick={() => navigate("../")}>
                                    Cancel
                                </Submit>
                            </div>
                        </Form>
                    </SectionCreateBlog>
                </CreateBlogContainer>
            )}
        </Wrapper>
    );
};

export default EditBlog;
