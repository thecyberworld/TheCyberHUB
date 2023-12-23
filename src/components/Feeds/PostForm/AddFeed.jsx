import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthPopup from "../../../pages/AuthPopup/AuthPopup";
import AddPostTags from "./AddPostTags/AddPostTags";
import AddPollTag from "./AddPostTags/AddPollTag";
import {
    AddFeedCommentContainer,
    AddImage,
    FooterSection,
    ImageContainer,
    ImagesContainer,
    PostFormButton,
    RemoveButton,
    FeedImage,
} from "./AddPostElements";
import { FeedCommentInput } from "../FeedPage/FeedComments/AddFeedCommentsElements";
import { LeftSection, PostHeaderImg, RightSection } from "../FeedPosts/FeedPostsElements";
import { ImageUploadLabel } from "../../Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { cdnContentImagesUrl, getApiUrl } from "../../../features/apiUrl";
import axios from "axios";
import { CircleSpinner } from "react-spinners-kit";
import { createFeed } from "../../../features/feeds/feedsSlice";
import { toast } from "react-toastify";

const AddPost = ({ showPostTags, userDetails }) => {
    // fs.readFile('./data.json', 'utf-8', (err, data) => {
    //     if (err) throw err;
    //     const dummyData = JSON.parse(data);
    //     console.log(json);
    //   });
    const data = [
        { id: 0, votes: 9, text: "Option One" },
        { id: 1, votes: 4, text: "Option Two" },
        { id: 2, votes: 7, text: "Option Three" },
        { id: 3, votes: 6, text: "Option Four" },
    ];
    // const resData = [
    //     { text: "Answer 1", votes: 5 },
    //     { text: "Answer 2", votes: 4 },
    //     { text: "Answer 3", votes: 7 },
    // ];
    // function handleVotes(item, results) {
    //     // Here you probably want to manage
    //     // and return the modified data to the server.
    // }
    const question = "What is your favorite food?";
    const [poll, setPoll] = useState({
        question,
        answers: data,
    });

    const calculateTotalVotes = (pollData) => {
        let total = 0;

        pollData.answers.forEach((answer) => {
            total += answer.votes;
        });

        return total;
    };
    const totalVotes = calculateTotalVotes(poll);
    const Percentage = (votes) => {
        return ((votes / totalVotes) * 100).toFixed(2);
    };
    const [post, setPost] = useState("Feed");
    const [vote, setVote] = useState("");
    function handleVote(answer) {
        // Update votes
        // const nextAnswers = poll.answers.map((a) => (a.text === answer.text ? { ...a, votes: a.votes + 1 } : a));

        if (vote === "") {
            setPoll((prevPoll) => {
                const nextAnswers = prevPoll.answers.map((a) => {
                    if (a.id === answer.id) {
                        return { ...a, votes: a.votes + 1 };
                    } else {
                        return a;
                    }
                });

                return {
                    ...prevPoll,
                    answers: nextAnswers,
                };
            });
            setVote(answer.id);
            
        } else if (vote === answer.id) {
            answer.votes = answer.votes - 1;
            setVote("");
            
        } else {
            poll.answers.find((a) => a.id === vote).votes -= 1;
            answer.votes = answer.votes + 1;
            setVote(answer.id);
            
        }

        // setPoll((prevPoll) => ({
        //     ...prevPoll,
        //     answers: nextAnswers,
        // }));
    }
    const dispatch = useDispatch();
    const textareaRef = useRef(null);
    const imageInputRef = useRef(null);

    const { user } = useSelector((state) => state.auth);

    const [isFeedLoading, setIsFeedLoading] = useState(false);

    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [pollOptions, setPollOptions] = useState([]);
    const [files, setFiles] = useState([]);
    const [feedImages, setFeedImages] = useState([]);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const maxCharacterCount = 1500;

    const [remainingCharacters, setRemainingCharacters] = useState(maxCharacterCount);

    useEffect(() => {
        setRemainingCharacters(maxCharacterCount - content.length);
    }, [content]);

    const handleChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setContent(textarea.value);
    };

    const handlePollChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        setpollContent(textarea.value);
    };

    const handleImageChange = (e) => {
        const imageFiles = e.target.files;

        const newFileNames = [];
        const feedImageNames = [];
        const newFiles = [];

        for (const file of imageFiles) {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                toast.warn("Only JPEG and PNG are allowed");
                return;
            }
            const fileName = `feed-${Date.now()}.${file && file.type.split("/")[1]}`;

            const reader = new FileReader();
            reader.onloadend = () => {
                const newFile = new File([reader.result], fileName, { type: file && file.type });
                newFileNames.push(fileName);
                feedImageNames.push(fileName.split("-")[1]);

                newFiles.push(newFile);

                if (newFiles.length === imageFiles.length) {
                    setFeedImages((prevFileNames) => [...prevFileNames, ...feedImageNames]);
                    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleRemoveImage = (index) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
    };

    const [pollContent, setpollContent] = useState("");
    const handleToggle = () => {
        if (post === "Feed") setPost("Poll");
        else setPost("Feed");
    };
    // const handlePollChange = () => {
    //     const textarea = textareaRef.current;
    //     textarea.style.height = "auto"; // Reset height to recalculate scrollHeight
    //     textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
    //     setpollContent(textarea.value);
    // };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsFeedLoading(true);

        if (!user) {
            setShowAuthPopup(true);
            setIsFeedLoading(false);
        } else if (!content) {
            toast.warn("Please enter some content");
            setIsFeedLoading(false);
        } else if (content.length > 1500) {
            toast.warn("Content cannot be more than 1500 characters");
            setIsFeedLoading(false);
            setIsFeedLoading(false);
        } else if (tags.length < 2) {
            toast.warn("Please add at least 2 tags");
            setIsFeedLoading(false);
        } else if (tags.length > 10) {
            toast.warn("You can add a maximum of 10 tags");
            setIsFeedLoading(false);
        } else if (files.length > 4) {
            toast.warn("You can upload a maximum of 4 images");
            setIsFeedLoading(false);
        } else {
            async function uploadFeedImages() {
                async function uploadFeedImage({ file }) {
                    const formData = new FormData();
                    formData.append("image", file);
                    const API_URL = getApiUrl("api/upload");
                    await axios.post(API_URL, formData);
                }

                for (const file of files) {
                    await uploadFeedImage({ file });
                }
            }

            if (files) await uploadFeedImages();

            const data = {
                content,
                tags,
                images: feedImages,
            };

            dispatch(createFeed(data));

            toast.success("Feed posted successfully");

            setIsFeedLoading(false);
            setContent("");
            setTags([]);
            setFiles([]);
            setFeedImages([]);

            // Reset the file input to clear the selected images
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
        }
    };

    const userDetail = userDetails?.find((userDetail) => userDetail?.user === user?._id);
    const avatar = cdnContentImagesUrl("/user/" + (userDetail?.avatar || "avatarDummy.png"));
    return (
        <AddFeedCommentContainer>
            <LeftSection>
                <PostHeaderImg src={avatar} alt="Profile picture" />
            </LeftSection>
            <RightSection>
                {post === "Feed" ? (
                    <div>
                        <div>
                            <FeedCommentInput
                                ref={textareaRef}
                                placeholder="What's on your mind?"
                                value={content}
                                onChange={handleChange}
                            />
                            <p
                                style={{
                                    color:
                                        remainingCharacters <= 99
                                            ? "#ff2525"
                                            : remainingCharacters <= 500
                                            ? "#ff6b08"
                                            : "grey",
                                    width: "100%",
                                    textAlign: "right",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    // border: '1px solid #ff6b08',
                                    marginTop: "-15px",
                                    marginBottom: "-10px",
                                }}
                            >
                                {remainingCharacters < 0 ? "-" : ""} {Math.abs(remainingCharacters)}
                            </p>
                        </div>

                        <ImagesContainer>
                            {files.map((file, index) => (
                                <ImageContainer key={index}>
                                    <FeedImage src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                                    <RemoveButton onClick={() => handleRemoveImage(index)}>&#10005;</RemoveButton>
                                </ImageContainer>
                            ))}
                        </ImagesContainer>

                        {/* File input for image upload */}
                        {files.length < 4 && (
                            <input
                                type="file"
                                name="feedImage"
                                id="feedImage"
                                ref={imageInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                multiple
                                style={{ display: "none" }}
                            />
                        )}

                        {showPostTags && <AddPostTags tags={tags} setTags={setTags} />}

                        <FooterSection>
                            <ImageUploadLabel
                                style={{ background: "transparent", border: "transparent", padding: "0" }}
                                htmlFor="feedImage"
                            >
                                {files.length < 4 && <AddImage />}
                            </ImageUploadLabel>

                            {isFeedLoading ? (
                                <PostFormButton>
                                    {" "}
                                    <CircleSpinner size={17} />{" "}
                                </PostFormButton>
                            ) : (
                                <PostFormButton onClick={onSubmit}>Create</PostFormButton>
                            )}
                        </FooterSection>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <FeedCommentInput
                                ref={textareaRef}
                                placeholder="What's your Question for Poll?"
                                value={pollContent}
                                onChange={handlePollChange}
                            />
                            <h3>{poll.question}</h3>
                            <div className="flex flex-col">
                                {<AddPollTag tags={pollOptions} setTags={setPollOptions} />}
                            </div>
                            <div className="border border-solid border-gray-400 border-1">
                                {poll.answers.map((answer) => (
                                    <div key={answer.id} className="flex flex-col w-full">
                                        <button
                                            className="relative mt-1 mb-1 px-4 py-2 text-white bg-black-600 rounded overflow-hidden"
                                            onClick={() => handleVote(answer)}
                                        >
                                            <span className="relative z-10">
                                                {answer.text} {Percentage(answer.votes)}%
                                            </span>
                                            <div
                                                className="absolute inset-0 bg-blue-500"
                                                style={{ width: `${Percentage(answer.votes)}%` }}
                                            ></div>
                                        </button>
                                        <div className="flex flex-col w-full">
                                            {/* <ProgressBar now={100} variant="success" label="label" />
                                        <ProgressBar now={70} label="label2" visuallyHidden />
                                        <ProgressBar now={now} label={`${now}%`} />
                                        <AnimatedExample />
                                        <Button variant="primary">Primary bootstrap button</Button>{' '} */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <PostFormButton onClick={handleToggle}>
                    {post === "Feed" ? "Create Poll" : "Create Feed"}
                </PostFormButton>
            </RightSection>

            {/* Render the AuthPopup component */}
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
        </AddFeedCommentContainer>
    );
};

export default AddPost;
