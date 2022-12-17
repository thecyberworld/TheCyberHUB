import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiFire } from "react-icons/hi";

import {
    Nav,
    NavbarContainer,
    NavLogoRouter,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    DropdownIcon,
    NavLogo,
} from "./NavbarElements";
// import { GlowingButton } from "../../MixComponents/Buttons/ButtonElements";

import Dropdown from "../Dropdowns/Dropdown";
import logo from "../../../../assets/images/WebsiteLogo/ThecyberhubLogo.png";
import { FilledButton } from "../../../MixComponents/Buttons/ButtonElements";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
// import {Spinner} from "../../../index";

const Navbar = ({ isOpen, toggle }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [scrollNav, setScrollNav] = useState(false);
    const [drop, setDrop] = useState(false);
    const [resourcesClick, setResourcesClick] = useState(true);
    const [learnClick, setLearnClick] = useState(true);
    const [onClosed, setOnClosed] = useState(true);

    const onClickResources = () => {
        if (drop) setResourcesClick(false);
    };
    const onClickLearn = () => {
        if (drop) setLearnClick(false);
    };

    const dropHandler = (title) => {
        if (title === "learn") {
            setDrop(true);
            setLearnClick(true);
            setResourcesClick(false);
            setOnClosed(true);
        } else if (title === "resources") {
            setDrop(true);
            setResourcesClick(true);
            setLearnClick(false);
            setOnClosed(true);
        } else setDrop(false);
    };

    // const closeDropHandler = () => {
    //     setDrop(false);
    // };

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, []);
    const toggleHome = () => {
        scroll.scrollToTop();
    };

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav onMouseLeave={() => setDrop(false)} scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogoRouter to={"/"} onClick={toggleHome}>
                            <NavLogo src={logo} />
                        </NavLogoRouter>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            {[
                                {
                                    title: (
                                        <>
                                            <p onClick={() => onClickLearn()}>Learn</p>
                                            <DropdownIcon onClick={() => onClickLearn()} />
                                        </>
                                    ),
                                    dropdown: "learn",
                                },
                                {
                                    title: (
                                        <>
                                            <p onClick={() => onClickResources()}>Resources</p>
                                            <DropdownIcon onClick={() => onClickResources()} />
                                        </>
                                    ),
                                    dropdown: "resources",
                                },
                                { to: "events", title: "Events", dropdown: "events" },
                                { to: "projects", title: "Projects", dropdown: "projects" },
                                { to: "community", title: "Community", dropdown: "community" },
                                { to: "sponsors", title: "Sponsors", dropdown: "sponsors" },
                            ].map(({ to, title, dropdown }) => (
                                <NavItem
                                    onMouseEnter={() => dropHandler(dropdown)}
                                    onMouseLeave={() => dropHandler(dropdown)}
                                    key={dropdown}
                                >
                                    <NavLinks to={to}>{title}</NavLinks>
                                    {dropdown === "learn" && learnClick && drop && (
                                        <Dropdown
                                            isLearn={true}
                                            toggle={setOnClosed}
                                            closed={onClosed}
                                            isOpen={isOpen}
                                        />
                                    )}
                                    {dropdown === "resources" && resourcesClick && drop && (
                                        <Dropdown
                                            isResources={true}
                                            toggle={setOnClosed}
                                            closed={onClosed}
                                            isOpen={isOpen}
                                        />
                                    )}
                                </NavItem>
                            ))}
                        </NavMenu>
                    </NavbarContainer>

                    <NavBtn>
                        <HiFire />

                        {/* <GlowingButton to={"CyberGames"}> */}
                        {/*        Cyber Games */}
                        {/* </GlowingButton> */}
                        {/* <RedirectButton href={"https://twitter.com/intent/tweet?text=Hi%20Everyone,%20%0D%0AFound%20the%20best%20website%20to%20learn%20Cybersecurity%20for%20free%20by%20@thecyberw0rld%20community.%20%0D%0A%0D%0AWebsite:%20https://thecyberhub.org%20%0D%0AResources:%20https://thecyberhub.org/resources%20%0D%0A%0D%0AMore%20features%20are%20on%20the%20way...%20%0D%0Afollow%20@thecyberw0rld%20for%20getting%20updates%20and%20for%20cyber%20security%20content."} rel="noopener" target="_blank" smooth={true} duration={500} spy={true} exact="true" offset={-80}> */}
                        {/*    <FaTwitter/> */}
                        {/*    <Text> Share </Text> */}
                        {/* </RedirectButton> */}
                        {user ? (
                            <>
                                <FilledButton onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </FilledButton>
                            </>
                        ) : (
                            <>
                                <FilledButton to="login">
                                    <FaSignInAlt /> Login
                                </FilledButton>
                                <FilledButton to="register">
                                    <FaUser /> Register
                                </FilledButton>
                            </>
                        )}
                    </NavBtn>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
