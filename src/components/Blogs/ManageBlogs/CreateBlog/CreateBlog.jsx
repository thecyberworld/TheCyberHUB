import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../../features/blogs/blogSlice";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../../../../features/goals/goalSlice";
import {
    AddCoverImageSection,
    AddImage,
    Container,
    CreateBlogContainer,
    Heading2,
    Heading3,
    ImageSelected,
    ImageUploadAndPreviewSection,
    ImageUploadInput,
    ImageUploadLabel,
} from "./CreateBlogElements";
import axios from "axios";
import PreviewBlogContent from "../../PreviewBlogContent";
import { Button, PreviewIcon, PreviewSection } from "../../../Forum/ForumSubPageElements";
import getApiUrl from "../../../../features/apiUrl";
import BlogPostForm from "../BlogPostForm";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { isSuccess, isError, message } = useSelector((state) => state.blogs);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const onPreview = () => setPreview(true);
    const closePreview = () => setPreview(false);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) navigate("/login");
        return () => dispatch(reset());
    }, [user, isError, message, isSuccess, navigate, dispatch]);

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        coverImage: "",
        tags: [],
    });
    const { title, content, tags } = blogData;

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const onChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "tags") value = value.split(",").map((tag) => tag.trim());

        if (file) {
            if (e.target.name === "title") {
                const newFile = new File(
                    [file],
                    `${
                        value &&
                        value
                            .toLowerCase()
                            .replace(/ +/g, "_")
                            .replace(/[^a-zA-Z0-9]/g, "_")
                            .replace(/_+/g, "_")
                    }_cover_image.${file && file.type.split("/")[1]}`,
                    { type: file && file.type },
                );
                setFile(newFile);
            }
        }
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            const newFile = new File(
                [reader.result],
                `${
                    title &&
                    title
                        .toLowerCase()
                        .replace(/ +/g, "_")
                        .replace(/[^a-zA-Z0-9]/g, "_")
                        .replace(/_+/g, "_")
                }_cover_image.${file && file.type.split("/")[1]}`,
                { type: file && file.type },
            );
            setFile(newFile);
        };
        reader.readAsArrayBuffer(file);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const API_URL = getApiUrl("api/upload");
                await axios.post(API_URL, formData);
            } catch (err) {
                console.error(err);
            }
        }

        const blogData = { title, content, coverImage: file.name, tags };
        dispatch(createBlog(blogData));

        setBlogData({ title: "", content: "", coverImage: "", tags: [] });
        setFileName("");
    };
    return (
        <Wrapper>
            <CreateBlogContainer>
                {isSuccess ? (
                    <Container>
                        <Heading2> Your blog has been unleashed upon the world! </Heading2>
                        <Heading3>
                            <Link to={`/blogs`} style={{ color: "cornflowerblue" }}>
                                Check out your blog
                            </Link>
                        </Heading3>
                    </Container>
                ) : null}
                <ImageUploadAndPreviewSection>
                    <AddCoverImageSection>
                        <ImageUploadLabel style={{ color: "grey" }} htmlFor="addCoverImage">
                            <AddImage />
                            {!fileName ? (
                                <> Add Cover Image </>
                            ) : (
                                !preview && !fileName && <ImageSelected> Please select an image </ImageSelected>
                            )}
                            <ImageSelected> {file && <p>{fileName} selected</p>} </ImageSelected>
                        </ImageUploadLabel>
                        <ImageUploadInput
                            type="file"
                            name="addCoverImage"
                            id="addCoverImage"
                            onChange={onFileChange}
                            style={{ display: "none" }}
                        />
                    </AddCoverImageSection>

                    <PreviewSection>
                        {!preview ? (
                            <Button onClick={onPreview}>
                                <PreviewIcon /> Show Preview{" "}
                            </Button>
                        ) : (
                            <Button onClick={closePreview}>
                                <PreviewIcon /> Close Preview{" "}
                            </Button>
                        )}
                    </PreviewSection>
                </ImageUploadAndPreviewSection>

                {preview ? (
                    <PreviewBlogContent
                        preview={preview}
                        closePreview={closePreview}
                        title={title}
                        content={content}
                        tags={tags}
                    />
                ) : (
                    <BlogPostForm title={title} content={content} tags={tags} onSubmit={onSubmit} onChange={onChange} />
                )}
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default CreateBlog;
