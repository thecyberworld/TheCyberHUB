import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import image from "../../../Blogs/img.webp";
import { encodeURL } from "../../util";
// import {Tags, Tag} from "../BlogCardElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset, updateBlog } from "../../../../features/blogs/blogSlice";
import Spinner from "../../../Other/MixComponents/Spinner/Spinner";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import {
    CreateBlogContainer,
    Form,
    Input,
    SectionCreateBlog,
    Submit,
    TagInput,
    TextArea,
} from "../CreateBlog/CreateBlogElements";
import PreviewMarkdown from "../../PreviewMarkdown";

const EditBlog = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const navigate = useNavigate();
    // const [editMode, setEditMode] = useState(true);
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

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    if (isLoading) {
        return <Spinner />;
    }
    const { title } = useParams();
    const searchedBlog = blogs.find((blog) => encodeURL(blog.title).toLowerCase() === title.toLowerCase()) || {
        tags: [],
    };
    const onPreview = () => {
        setPreview(true);
    };

    const closePreview = () => {
        setPreview(false);
    };
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

        const tagData = blogData.tags.length === 0 ? searchedBlog.tags : blogData.tags;

        const updatedBlogData = {
            title: blogData.title || searchedBlog.title,
            content: blogData.content || searchedBlog.content,
            tags: tagData,
        };

        dispatch(updateBlog({ id: searchedBlog._id, blogData: updatedBlogData }));
        // setEditMode(false);
        navigate("../");
    };

    return (
        <Wrapper>
            {!preview && <Submit onClick={onPreview}>Show Preview</Submit>}
            {preview ? (
                <PreviewMarkdown
                    preview={preview}
                    closePreview={closePreview}
                    title={blogData.title || searchedBlog.title}
                    content={blogData.content || searchedBlog.content}
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
                                    value={blogData.title || searchedBlog.title}
                                    onChange={onChange}
                                />
                                <TextArea
                                    name="content"
                                    id="content"
                                    value={blogData.content || searchedBlog.content}
                                    onChange={onChange}
                                />
                                <TagInput
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    value={blogData.tags.join(", ") || searchedBlog.tags.join(", ")}
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
