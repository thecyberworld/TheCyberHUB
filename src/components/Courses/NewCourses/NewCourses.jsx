import CoursesData from "./CoursesData"
import {
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
import { useState } from "react";

const NewCourses = () => {
  const [filterContent, setFilterContent] = useState(null)

  const doFilterContent = (filter) => {
    if(filterContent === null){
      setFilterContent(filter)
    }
    else{
      setFilterContent(null)
    }
    console.log(filterContent)
  }

    return(

        <div>
        {Object.values(CoursesData).map((courseData, index) => (
          filterContent === null || filterContent === courseData.courseName ?
          <div>
            <Card key={index} onClick={() => { doFilterContent(courseData.courseName)}}>
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
          {filterContent !== null ?  courseData.sections.map((section, index) => (
            <div key={index}>
              <Weeks key={index}><h3>{section.sectionName}</h3></Weeks>
              
              <Days key={index}>
              <ul>
                {section.videos.map((video, videoIndex) => (
                  <>
                  <TopicBox
                    key={index}
                  >
                    <ContentHeading>{video.title}</ContentHeading>
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
            </div>
          )) : null}
        </div>
        : null))}
      </div>
    )
}

export default NewCourses;