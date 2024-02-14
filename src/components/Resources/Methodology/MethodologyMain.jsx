import React from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { MethodologyData } from "./MethodlogyData";

const Methodology = () => {
    function handleClick(id) {
        if (document.getElementById(id).style.display === "block") {
            document.getElementById(id).style.display = "none";
        } else {
            document.getElementById(id).style.display = "block";
        }
    }
    return (
        <Wrapper>
            <div></div>
            <div>
                {Object.keys(MethodologyData).map((mainTitle) => (
                    <div
                        key={data}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "820px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "42px",
                            }}
                        >
                            {data}
                        </h1>
                        <p
                            style={{
                                display: "block",
                                textAlign: "center",
                            }}
                        >
                            {MethodologyData[data].Description}
                        </p>

                        {Object.keys(MethodologyData[data].Topics).map((Topics) => (
                            <div key={Topics} style={{ width: "100%", margin: "20px" }}>
                                <h2 style={{ textAlign: "center", fontSize: "25px" }}>{Topics}</h2>
                                {Object.keys(MethodologyData[data].Topics[Topics]).map((SubTopics) => (
                                    <div key={SubTopics} style={{ width: "100%" }}>
                                        <h2
                                            onClick={() => {
                                                handleClick(SubTopics);
                                            }}
                                            style={{
                                                background: "rgb(19, 19, 19)",
                                                marginBottom: "0px",
                                                padding: "15px",
                                                width: "100%",
                                                borderBottom: "1px solid white",
                                                borderTop: "0.5px solid white",
                                            }}
                                        >
                                            {SubTopics}
                                        </h2>
                                        <div
                                            id={SubTopics}
                                            style={{ display: "none", padding: "20px", background: "rgb(26, 28, 29)" }}
                                        >
                                            <p>
                                                {" "}
                                                <span style={{ fontWeight: "bold" }}>Summary </span>-
                                                {MethodologyData[data].Topics[Topics][SubTopics].Summary}
                                            </p>
                                            <h1 style={{ marginTop: "5px" }}>Goals:</h1>
                                            <ul style={{ listStyle: "circle", marginLeft: "30px" }}>
                                                {MethodologyData[data].Topics[Topics][SubTopics].Goals.map(
                                                    (Goals) => (
                                                        <li key={Goals}>{Goals}</li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Wrapper>
    );
};

export default Methodology;
