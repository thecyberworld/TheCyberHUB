import React, { useState } from "react";
import {
    CertificateContainer,
    GetCertificateContainer,
    Heading,
    InputBox,
    InvalidCertificate,
} from "../CyberGames/CTF/CTFElements";
import "../CyberGames/CTF/CTF.css";
import CertificateCard from "./CertificateCard";
import { RouterLink } from "../Learn/Roadmaps/RoadmapElements";

const CertificatePage = () => {
    const [certId, setCert] = useState("");
    return (
        <div>
            <GetCertificateContainer>
                <Heading> Certificate </Heading>
                <Heading> How to get Certificate</Heading>
                <Heading> Get your certificate from here </Heading>

                <RouterLink to={"certificate"}>
                    <Heading> Get Certificate </Heading>
                </RouterLink>
                <InputBox
                    type="text"
                    placeholder={"certificate id"}
                    name={"site"}
                    value={certId}
                    onChange={(e) => setCert(e.target.value)}
                />
            </GetCertificateContainer>
            <CertificateContainer>
                {certId.length === 13 ? <CertificateCard certId={certId} /> : " "}
                {(certId.length > 5 && certId.length !== 13) || certId.length > 13 ? (
                    <InvalidCertificate>
                        <h4>Invalid certificate id</h4>
                    </InvalidCertificate>
                ) : (
                    " "
                )}
            </CertificateContainer>
        </div>
    );
};

export default CertificatePage;
