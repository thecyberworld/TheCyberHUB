import React from "react";
import { CTFContainer, GetCertificateContainer, Heading } from "./CTFElements";
import "./CTF.css";
import { RouterLink } from "../../Learn/Roadmaps/RoadmapElements";

const CTF = () => {
    return (
        <CTFContainer>
            <GetCertificateContainer>
                <Heading> CTFs </Heading>
                <Heading> OnGoing CTF </Heading>
                <Heading> UpComing CTFs </Heading>
                <Heading> Past CTFs </Heading>

                <RouterLink to={"certificate"}>
                    <Heading> Get Certificate </Heading>
                </RouterLink>
            </GetCertificateContainer>
        </CTFContainer>
    );
};

export default CTF;
