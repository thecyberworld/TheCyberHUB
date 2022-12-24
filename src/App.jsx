import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./pages/Register";
import {
    Navbar,
    Sidebar,
    Courses,
    CourseDetail,
    CoursesLayout,
    Roadmaps,
    CyberNews,
    Jobs,
    Quiz,
    InterviewQuestions,
    Events,
    Event,
    Community,
    About,
    CTF,
    CyberGames,
    OSINTGame,
    Footer,
    Sponsors,
    OpensourceProjects,
    Spinner,
    AllBlogs,
    ViewBlog,
    Roadmap,
} from "./components";

import { Container } from "./components/MixComponents/Layout/LayoutElements";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./components/Dashboard/Profile/Profile";
import LearningPath from "./components/LearningPath/LearningPath";

const App = () => {
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    const showFooter = () => {
        const register = pathname !== "/register";
        const login = pathname !== "/login";
        if (register === false) {
            return register;
        } else return login;
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <Container>
                    {showFooter() && (
                        <>
                            <Sidebar isOpen={isOpen} toggle={toggle} />
                            <Navbar toggle={toggle} />
                        </>
                    )}

                    <ScrollToTop>
                        <Routes>
                            <Route index exact path={"/"} element={<Homepage />} />

                            <Route exact path={"/dashboard"} element={<Dashboard />} />
                            <Route exact path={"/login"} element={<Login />} />
                            <Route exact path={"/register"} element={<Register />} />
                            <Route exact path={"/profile"} element={<Profile />} />

                            <Route path={"/events/*"}>
                                <Route index element={<Events />} />
                                <Route path={":slug"} element={<Event />} />
                            </Route>
                            <Route exact path={"/community"} element={<Community />} />
                            <Route exact path={"/sponsors"} element={<Sponsors />} />
                            <Route exact path={"/about"} element={<About />} />
                            <Route exact path={"/projects"} element={<OpensourceProjects />} />

                            <Route exact path={"/CyberGames"} element={<CyberGames />} />
                            <Route exact path={"/CTF"} element={<CTF />} />
                            <Route exact path={"/OSINT"} element={<OSINTGame />} />
                            <Route exact path={"/learning-path"} element={<LearningPath />} />

                            <Route>
                                <Route path={"/roadmaps"}>
                                    <Route index element={<Roadmaps />} />
                                    <Route path={":title"} element={<Roadmap />} />
                                </Route>

                                <Route path={"/courses"} element={<CoursesLayout />}>
                                    <Route index element={<Courses />} />
                                    <Route path={":id"} element={<CourseDetail />} />
                                </Route>

                                <Route path={"/blogs"}>
                                    <Route index element={<AllBlogs />} />
                                    <Route exact path={":title"} element={<ViewBlog />} />
                                </Route>
                            </Route>

                            <Route>
                                <Route path={"/events"}>
                                    <Route index element={<Events />} />
                                    <Route path={":title"} element={<Event />} />
                                </Route>

                                <Route path={"/jobs"} element={<Jobs />} />
                                <Route path={"/quiz"} element={<Quiz />} />
                                <Route path={"/interviewQuestions"} element={<InterviewQuestions />} />
                                <Route path={"/cyberNews"} element={<CyberNews />} />
                            </Route>
                        </Routes>
                    </ScrollToTop>
                    {showFooter() && <Footer />}
                </Container>
            )}
            <ToastContainer />
        </div>
    );
};

export default App;
