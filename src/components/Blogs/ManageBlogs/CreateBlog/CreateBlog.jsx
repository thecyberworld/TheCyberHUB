import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../../features/blogs/blogSlice";
import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../../../../features/goals/goalSlice";
import {
    AddCoverImageSection,
    AddImage,
    CreateBlogContainer,
    Form,
    ImageSelected,
    ImageUploadAndPreviewSection,
    ImageUploadInput,
    ImageUploadLabel,
    Input,
    SectionCreateBlog,
    Submit,
    TagInput,
    TextArea,
} from "./CreateBlogElements";
import axios from "axios";
import PreviewMarkdown from "../../PreviewMarkdown";
import { Button, PreviewIcon, PreviewSection } from "../../../Forum/ForumSubPageElements";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { isSuccess, isError, message } = useSelector((state) => state.blogs);
    const [preview, setPreview] = useState(false); // added state variable for preview
    const onPreview = () => {
        setPreview(true);
    };
    const closePreview = () => {
        setPreview(false);
    };

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (!user) {
            navigate("/login");
        }

        return () => {
            dispatch(reset());
        };
    }, [user, isError, message, isSuccess, navigate, dispatch]);

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        coverImage: "",
        tags: [],
    });

    const { title, content, tags } = blogData;

    const onChange = (e) => {
        let value = e.target.value;
        if (e.target.name === "tags") {
            value = value.split(",").map((tag) => tag.trim()); // Split the string on comma and trim each tag
        }

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
                    }_coverImg.${file && file.type.split("/")[1]}`,
                    { type: file && file.type },
                );
                setFile(newFile);
                setFileName(newFile.name);
            }
        }
        setBlogData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const onFileChange = (e) => {
        const file = e.target.files[0];

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
                }_coverImg.${file && file.type.split("/")[1]}`,
                { type: file && file.type },
            );
            setFile(newFile);
            setFileName(file.name);
        };
        reader.readAsArrayBuffer(file);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                let API_URL = "";
                if (import.meta.env.VITE_WEB_ENV === "dev_production") {
                    API_URL = `${import.meta.env.VITE_API_URL}/api/upload/`;
                } else API_URL = "/api/upload/";

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
                    <>
                        <h1>Blog created successfully</h1>
                        <h2>
                            <Link to={"../"} style={{ color: "cornflowerblue" }}>
                                {" "}
                                Visit{" "}
                            </Link>
                        </h2>
                    </>
                ) : null}
                <ImageUploadAndPreviewSection>
                    <AddCoverImageSection>
                        <ImageUploadLabel style={{ color: "grey" }} htmlFor="addCoverImage">
                            <AddImage /> Add Cover Image
                        </ImageUploadLabel>
                        <ImageUploadInput
                            type="file"
                            name="addCoverImage"
                            id="addCoverImage"
                            onChange={onFileChange}
                            style={{ display: "none" }}
                        />
                        <ImageSelected> {file && <p>{fileName} selected</p>} </ImageSelected>
                    </AddCoverImageSection>

                    <PreviewSection>
                        {!preview ? (
                            <Button onClick={onPreview}>
                                <PreviewIcon /> Show Preview
                            </Button>
                        ) : (
                            <Button onClick={closePreview}>
                                <PreviewIcon /> Close Preview
                            </Button>
                        )}
                    </PreviewSection>
                </ImageUploadAndPreviewSection>

                {preview ? (
                    <PreviewMarkdown preview={preview} closePreview={closePreview} title={title} content={content} />
                ) : (
                    <SectionCreateBlog>
                        <Form onSubmit={onSubmit}>
                            <div>
                                <Input
                                    type="title"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={onChange}
                                    placeholder="Title"
                                />
                                <TextArea
                                    name="content"
                                    id="content"
                                    value={content}
                                    onChange={onChange}
                                    placeholder="Enter your content here in markdown"
                                />
                                <TagInput
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    value={tags}
                                    onChange={onChange}
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>
                            <div>
                                <Submit type={"submit"}>Publish Blog</Submit>
                            </div>
                        </Form>
                    </SectionCreateBlog>
                )}
            </CreateBlogContainer>
        </Wrapper>
    );
};

export default CreateBlog;
