import React, { useState, useEffect } from "react";
import "./App.css";
import {
    Route,
    Routes,
    // useLocation
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ScrollToTop from "./components/MixComponents/ScrollToTop";
import Registration from "./pages/Registration";
import {
    Navbar,
    Sidebar,
    Learn,
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
    Footer,
    Sponsors,
    CyberGames,
} from "./components";
import OpensourceProjects from "./components/OpensourceProjects/OpensourceProjects";
import Spinner from "./components/MixComponents/Spinner/Spinner";
import AllBlogs from "./components/Learn/Blogs/Blogs";
import ViewBlog from "./components/Learn/Blogs/ViewBlog";
import Roadmap from "./components/Learn/Roadmaps/Roadmap";
import { Container } from "./components/MixComponents/Layout/LayoutElements";
import CertificateCard from "./components/Certificate/CertificateCard";
import CertificatePage from "./components/Certificate/CertificatePage";

const App = () => {
    const [loading, setLoading] = useState(false);
    // const { pathname } = useLocation();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    // const showFooter = () => {
    //     return pathname !== "/register";
    // };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <Container>
                    <>
                        <Sidebar isOpen={isOpen} toggle={toggle} />
                        <Navbar toggle={toggle} />
                    </>

                    <ScrollToTop>
                        <Routes>
                            <Route index exact path={"/"} element={<Homepage />} />

                            <Route path={"/events/*"}>
                                <Route index element={<Events />} />
                                <Route path={":slug"} element={<Event />} />
                            </Route>
                            <Route exact path={"/community"} element={<Community />} />
                            <Route exact path={"/sponsors"} element={<Sponsors />} />
                            <Route exact path={"/about"} element={<About />} />
                            <Route exact path={"/projects"} element={<OpensourceProjects />} />

                            <Route exact path={"/CyberGames"} element={<CyberGames />} />

                            <Route exact path={"/ctf"}>
                                <Route index element={<CTF />} />
                                <Route path={"certificate"} element={<CertificatePage />} />
                                <Route path={"certificate/:id"} element={<CertificateCard />} />
                            </Route>

                            <Route exact path={"/learn/*"}>
                                <Route index path={"learn"} element={<Learn />} />

                                <Route path={"roadmaps"}>
                                    <Route index element={<Roadmaps />} />
                                    <Route path={":title"} element={<Roadmap />} />
                                </Route>

                                <Route path={"courses"} element={<CoursesLayout />}>
                                    <Route index element={<Courses />} />
                                    <Route path={":id"} element={<CourseDetail />} />
                                </Route>

                                <Route path={"blogs"}>
                                    <Route index element={<AllBlogs />} />
                                    <Route exact path={":title"} element={<ViewBlog />} />
                                </Route>
                            </Route>

                            <Route exact path={"/resources/*"}>
                                <Route path={"events"}>
                                    <Route index element={<Events />} />
                                    <Route path={":title"} element={<Event />} />
                                </Route>

                                <Route path={"jobs"} element={<Jobs />} />
                                <Route path={"quiz"} element={<Quiz />} />
                                <Route path={"interviewQuestions"} element={<InterviewQuestions />} />
                                <Route path={"cyberNews"} element={<CyberNews />} />
                            </Route>

                            <Route exact path={"/register"} element={<Registration />}></Route>
                        </Routes>
                    </ScrollToTop>
                    {/* {showFooter() &&
                    } */}
                    <Footer />
                </Container>
            )}
        </div>
    );
};

export default App;
