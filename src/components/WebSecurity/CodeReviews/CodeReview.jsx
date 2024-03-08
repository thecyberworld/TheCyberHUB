import React from "react";
import { codeReviewData } from "./CodeReviewData";
import Labs from "src/components/WebSecurity/Common/Labs/Labs";

const CodeReview = () => {
    return <Labs LabData={codeReviewData} />;
};

export default CodeReview;
