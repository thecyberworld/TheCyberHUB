import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import { FaBars } from "react-icons/fa";

import {
    Nav,
    NavbarContainer,
    NavLogoRouter,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    // NavBtn,
    DropdownIcon,
    NavLogo,
} from "./NavbarElements";

import Dropdown from "../Dropdowns/Dropdown";
import logo from "../../../assets/images/WebsiteLogo/ThecyberhubLogo.png";
import Streak from "../../Dashboard/Streak/Streak";
import UserOptions from "../UserOptions/UserOptions";

const Navbar = ({ isOpen, toggle }) => {
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
                                // { to: "events", title: "Events", dropdown: "events" },
                                // { to: "projects", title: "Projects", dropdown: "projects" },
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
                    <Streak />
                    <UserOptions />
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;
