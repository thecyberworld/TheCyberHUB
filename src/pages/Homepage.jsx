import React from "react";
import { Hero, Info, Socials } from "../components";
import { aboutData, ResourcesData, communityData, contributeData } from "../components/Homepage/Info/Data";
import ContactForm from "../components/ContactForm/ContactForm";
import { useSelector } from "react-redux";

const Homepage = () => {
    const logout = useSelector((state) => state.auth.logout);
    console.log(logout);
    return (
        <>
            <Hero />
            <Info {...aboutData} />
            <Info {...ResourcesData} />
            <Info {...contributeData} />
            <Info {...communityData} />
            <Socials />
            <ContactForm />
        </>
    );
};

export default Homepage;
