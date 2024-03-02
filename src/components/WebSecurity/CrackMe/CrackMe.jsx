import React from "react";
import Lab from "../Common/Labs/Labs";
import { crackmeLabData } from "./CrackMeData";
const CrackMe = () => {
    return <Lab LabData={crackmeLabData} heading={"Crack Me"} />;
};

export default CrackMe;
