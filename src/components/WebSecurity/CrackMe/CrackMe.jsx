import React from "react";
import Lab from "src/components/WebSecurity/Common/Labs/Labs";
import { crackmeLabData } from "./CrackMeData";
const CrackMe = () => {
    return <Lab LabData={crackmeLabData} />;
};

export default CrackMe;
