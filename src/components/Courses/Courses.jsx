import React from "react";
import FreeCourse from "./LearningPath/FreeCourse";
import { CoursesContainer } from "./CoursesElements";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import NewCourses from "./NewCourses/NewCourses";

const Courses = () => {
    return (
        <Wrapper>
            <CoursesContainer>
                {/* <FreeCourse /> */}
                <NewCourses/>
            </CoursesContainer>
        </Wrapper>
    );
};

export default Courses;
