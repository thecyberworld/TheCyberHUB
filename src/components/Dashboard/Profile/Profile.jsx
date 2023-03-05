import React, { useEffect } from "react";
import {
    BlogCard,
    BlogCoverImage,
    BlogPostContainer,
    CommentAmountContainer,
    CommentContainer,
    HeaderContainer,
    HeaderSection,
    ProfileContainer,
    ProfileDetailsContainer,
    UserBanner,
    UserImage,
    UserInfo,
    Wrapper,
} from "./ProfileElements";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, reset } from "../../../features/userDetails/userDetailSlice";
import { Link, useNavigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import ComingSoon from "../../Other/MixComponents/ComingSoon";
import { getCDNUrl, webEnv } from "../../../features/apiUrl";
import BackGroundImage from "../../../assets/images/DevelopmentImages/coffee-computer.jpeg";
import { BsFillGearFill } from "react-icons/bs";
import { IoChatbubbleEllipses } from "react-icons/io5";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.userDetails);

    useEffect(() => {
        if (user && isError) console.log(message);
        if (!user) navigate("/");
        else dispatch(getUserDetails());
        return () => dispatch(reset());
    }, [isError, message, dispatch, user, navigate]);

    const API_URL = getCDNUrl;
    const profilePicture = user?.picture;
    const dummyPicture =
        "https://user-images.githubusercontent.com/44284877/210164205-8dfa753b-f98a-4b25-a243-164c9790b625.png";
    const profilePictureUrl = user?.picture === "" ? dummyPicture : `${API_URL}/blog_images/${profilePicture}`;

    if (webEnv !== "production") {
        return <ComingSoon />;
    }
    return (
        <Wrapper>
            <ProfileContainer>
                <HeaderContainer>
                    <HeaderSection className="heading">
                        <h5 style={{ zIndex: 2, backgroundColor: "black", paddingInline: "5%" }}>
                            Welcome {user && user?.username}
                        </h5>
                        <Link
                            style={{
                                color: "whitesmoke",

                                display: "flex",
                                flex: 1,
                                justifyContent: "flex-end",

                                marginRight: 10,
                            }}
                            to={"edit"}
                        >
                            <BsFillGearFill style={{ zIndex: 2 }} size={25} />
                        </Link>
                    </HeaderSection>

                    <UserBanner src={BackGroundImage} />
                    <UserImage src={profilePictureUrl} />
                </HeaderContainer>
                <ProfileDetailsContainer>
                    <h3> Profile Details </h3>
                    {isLoading && <CircleSpinner size={20} color={"#1fc10d"} />}

                    <UserInfo>
                        <h4>Name: {user?.name}</h4>
                        <h5>Email: {user?.email}</h5> <br />
                    </UserInfo>
                </ProfileDetailsContainer>
            </ProfileContainer>
            <h1 style={{ marginInline: "5%" }}>Your Blogs</h1>
            <BlogPostContainer>
                <BlogCard>
                    <div
                        style={{
                            marginTop: "2%",
                            flex: 1,
                        }}
                    >
                        <h3
                            style={{
                                height: "15%",
                                marginInline: "5%",
                                textAlign: "center",
                            }}
                        >
                            Learn to code in React{" "}
                        </h3>
                    </div>

                    <BlogCoverImage src={BackGroundImage} />
                    <CommentContainer>
                        <CommentAmountContainer
                            style={{
                                flex: 1,
                                zIndex: 5,
                                backgroundColor: "#f7543b",
                                width: "3%",
                                borderRadius: "20%",
                                marginLeft: "4%",
                                marginBottom: "-5%",
                                position: "absolute",
                            }}
                        >
                            <p
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                10+
                            </p>
                        </CommentAmountContainer>

                        <IoChatbubbleEllipses
                            style={{
                                flex: 1,
                                margin: "2%",
                                padding: "2%",
                                borderRadius: "20%",
                                backgroundColor: "black",
                            }}
                            size={50}
                            color="white"
                        />
                    </CommentContainer>
                </BlogCard>
                <BlogCard>
                    <div
                        style={{
                            marginTop: "2%",
                            flex: 1,
                        }}
                    >
                        <h3
                            style={{
                                height: "15%",
                                marginInline: "5%",
                                textAlign: "center",
                            }}
                        >
                            Learn to code in React{" "}
                        </h3>
                    </div>

                    <BlogCoverImage src={BackGroundImage} />
                    <CommentContainer>
                        <CommentAmountContainer
                            style={{
                                flex: 1,
                                zIndex: 5,
                                backgroundColor: "#f7543b",
                                width: "3%",
                                borderRadius: "20%",
                                marginLeft: "4%",
                                marginBottom: "-5%",
                                position: "absolute",
                            }}
                        >
                            <p
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                10+
                            </p>
                        </CommentAmountContainer>

                        <IoChatbubbleEllipses
                            style={{
                                flex: 1,
                                margin: "2%",
                                padding: "2%",
                                borderRadius: "20%",
                                backgroundColor: "black",
                            }}
                            size={50}
                            color="white"
                        />
                    </CommentContainer>
                </BlogCard>
            </BlogPostContainer>
        </Wrapper>
    );
};

export default Profile;
