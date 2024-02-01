import { Wrapper } from "../../../Dashboard/Profile/ProfileElements";
import React, { useEffect, useState } from "react";
import { Search } from "../LabsElement";
import { useParams } from "react-router-dom";
import { LabData } from "../LabsData";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Room() {
    const { id } = useParams();
    const data = LabData[id];

    const [hidden, setHidden] = useState(0);

    useEffect(() => {
        const solutionHolder = document.getElementById("SolutionHolder");

        if (hidden === 0) {
            solutionHolder.style.visibility = "hidden";
        } else {
            solutionHolder.style.visibility = "visible";
        }
    }, [hidden]);

    return (
        <Wrapper>
            <div
                style={{
                    width: "80%",
                    backgroundColor: "#1A1C1D",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "60px",
                        backgroundColor: "#131313",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px",
                    }}
                >
                    <label
                        style={{
                            fontSize: "20px",
                        }}
                    >
                        {data.title}
                    </label>
                    <a
                        href={data.labLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: "none",
                            padding: "10px 15px",
                            backgroundColor: "#ff6b08",
                            color: "#151515",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Start Lab
                    </a>
                </div>
                <div style={{ padding: "20px", marginLeft: "20px", marginRight: "20px" }}>
                    <p style={{ paddingBottom: "20px" }}>{data.description}</p>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                            }}
                        >
                            <Search style={{ width: "100%", marginLeft: "0" }} />
                            <button
                                style={{
                                    padding: "10px 15px",
                                    backgroundColor: "#ff6b08",
                                    color: "black",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                {" "}
                                Submit{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "80%",
                    marginTop: "20px",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        padding: "10px 20px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#1a1c1d",
                    }}
                    onClick={() => {
                        setHidden((prevHidden) => (prevHidden === 0 ? 1 : 0));
                    }}
                >
                    <p
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        {" "}
                        Solution{" "}
                    </p>
                    <span
                        style={{
                            fontSize: "20px",
                        }}
                    >
                        {" "}
                        {hidden === 0 ? <FaAngleDown /> : <FaAngleUp />}{" "}
                    </span>
                </div>

                <div
                    style={{
                        width: "100%",
                        padding: "20px",
                        backgroundColor: "#131313",
                    }}
                    id="SolutionHolder"
                >
                    {hidden === 1 &&
                        data?.solution?.map((data, index) => {
                            return (
                                <div style={{ padding: "10px 0" }} key={index}>
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            opacity: "80%",
                                        }}
                                    >
                                        {" "}
                                        {id + 1}.{" "}
                                    </span>
                                    <span
                                        style={{
                                            paddingLeft: "10px",
                                            fontSize: "16px",
                                            opacity: "80%",
                                        }}
                                    >
                                        {" "}
                                        {data}{" "}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Wrapper>
    );
}
