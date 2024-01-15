import CoursesData from "./CoursesData";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    //   CardFooter,
    //   ChannelImg,
    //   ChannelHeading,
    Img,
    Link,
    //   Tag,
    //   User,
    //   UserInfo,
    VideoHeading,
} from "../../Learn/Courses/VideoCard/VideoCardElements";
// import {
//   BackArrow,
//   Checkbox,
//   CheckboxContainer,
//   Content,
//   ContentHeading,
//   ContentList,
//   ContentNavigation,
//   Days,
//   ForwardArrow,
//   LearningPathContainer,
//   LearningPathWrapper,
//   LeftContainer,
//   NavigationButtonSection,
//   RightContainer,
//   // SectionHeading,
//   TopicBox,
//   VLine,
//   Weeks,
// } from "../LearningPath/LearningPathElements";
import { RouterLink } from "../../Tools/ToolsElements";
import { encodeURL } from "../../Blogs/util";
import { Cards } from "../../Forum/ForumPosts/ForumPostsElements";
// import { Cards } from "../../Forum/ForumPosts/ForumPostsElements";

const NewCourses = () => {
    const [filterContent, setFilterContent] = useState("");

    const doFilterContent = (filter) => {
        if (filterContent === null) {
            setFilterContent(filter);
        } else {
            setFilterContent(null);
        }
        console.log(filterContent);
    };

    return (
        <Cards>
            {Object.values(CoursesData).map((courseData, index) => (
                <>
                    <RouterLink to={{ pathname: `${encodeURL(courseData.courseName)}` }}>
                        <Card
                            key={index}
                            onClick={() => {
                                doFilterContent(courseData.courseName);
                            }}
                        >
                            <div>
                                <Img src={courseData.thumbnail} alt="card__image" width="600" />
                            </div>
                            <CardBody>
                                <VideoHeading>
                                    <Link href="" target={"_blank"}>
                                        {courseData.courseName}
                                    </Link>
                                </VideoHeading>
                            </CardBody>
                        </Card>
                    </RouterLink>
                </>
            ))}
        </Cards>
    );
};

export default NewCourses;
