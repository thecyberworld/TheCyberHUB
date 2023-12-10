import CoursesData from "./CoursesData"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  ChannelImg,
  ChannelHeading,
  Img,
  Link,
  Tag,
  User,
  UserInfo,
  VideoHeading,
} from "../../Learn/Courses/VideoCard/VideoCardElements";
import {
  BackArrow,
  Checkbox,
  CheckboxContainer,
  Content,
  ContentHeading,
  ContentList,
  ContentNavigation,
  Days,
  ForwardArrow,
  LearningPathContainer,
  LearningPathWrapper,
  LeftContainer,
  NavigationButtonSection,
  RightContainer,
  // SectionHeading,
  TopicBox,
  VLine,
  Weeks,
} from "../LearningPath/LearningPathElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { useState } from "react";
import { encodeURL } from "../../Blogs/util";
import { useParams } from "react-router";
import { ArrowForward, ArrowRight } from "../../Homepage/Hero/HeroElements";
import { BsArrowLeft } from "react-icons/bs";

const Course = () => {
  // const [filterContent, setFilterContent] = useState("")
  const { title } = useParams();

  // const doFilterContent = (filter) => {
  //   if (filterContent === null) {
  //     setFilterContent(filter)
  //   }
  //   else {
  //     setFilterContent(null)
  //   }
  //   console.log(filterContent)
  // }

  const changeImgSrc = (src) => {
    console.log(src,"1")
    document.getElementById("image").src = src  
  }

  const course = Object.values(CoursesData)?.find((course) => `${encodeURL(course?.courseName)}`.toLowerCase() === title.toLowerCase());
  return (
    
    <Wrapper>
        <div>
          <Button href="/Courses">Go Back</Button>
            { course.sections.map((section, index) => (
              <LeftContainer key={index}>
                <Weeks key={index}><h3>{section.sectionName}</h3></Weeks>

                <Days key={index}>
                  <ul>
                    {section.videos.map((video, videoIndex) => (
                      <>
                        <TopicBox onClick={() => changeImgSrc(video.imageUrl)}
                          key={index}
                        >
                          <ContentHeading >{video.title}</ContentHeading>
                          <CheckboxContainer>
                            <Checkbox
                              type="checkbox"
                              />
                          </CheckboxContainer>
                        </TopicBox>
                      </>
                    ))}
                  </ul>
                </Days>
              </LeftContainer>
            )) }
            </div>
            <RightContainer>
              <img src="" id="image"/>
            </RightContainer>
    </Wrapper>
  )
}

export default Course;