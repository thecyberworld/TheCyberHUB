import React, { useEffect, useState } from "react";
import {
    JSONDisplayContainer,
    ScansContainer,
    TargetCard,
    TargetsContainer,
} from "src/components/Tools/Reconage/ScansElements.jsx";

const Scans = () => {
    const API_URL = "http://localhost:5001/api/";
    const [scansData, setScansData] = useState();

    useEffect(
        () => {
            fetch(API_URL + "scans")
                .then((response) => response.json())
                .then((data) => setScansData(data))
                .catch((error) => console.error("Error:", error));
            return () => {
                // cleanup
            };
        },
        [scansData] || [],
    );

    console.log(scansData);

    return (
        <ScansContainer>
            <TargetsContainer>
                {scansData?.scans?.map((scan, index) => (
                    <TargetCard key={index}>{scan.domain}</TargetCard>
                ))}
            </TargetsContainer>

            <JSONDisplayContainer>{JSON.stringify(scansData, null, 2)}</JSONDisplayContainer>
        </ScansContainer>
    );
};

export default Scans;
