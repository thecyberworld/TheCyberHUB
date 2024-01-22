import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import React, { useEffect, useState } from "react";
// import { Label } from "../../Resources/Quiz/CreateQuiz/CreateQuizElement";
import { Search } from "../MainElement";
import { useParams } from "react-router-dom";
import { RoomData } from "./LabsRoomData";
// import { useNavigate } from 'react-router-dom';

export default function Room() {
    const { id } = useParams();
    const data = RoomData[id];
    const [hidden, setHidden] = useState(0);
    useEffect(() => {
        if (hidden === 0) {
            document.getElementById("SolutionHolder").style.visibility = "hidden";
        } else {
            document.getElementById("SolutionHolder").style.visibility = "visible";
        }
    }, [hidden]);
    function handleClick() {
        window.location.href = data.link;
    }

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
                        widows: "100%",
                        height: "80px",
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
                        {data.heading}
                    </label>
                    <button
                        onClick={handleClick}
                        style={{
                            padding: "10px 15px",
                            backgroundColor: "#ff6b08",
                            color: "#151515",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Start Labs
                    </button>
                </div>
                <div style={{ padding: "20px", marginLeft: "20px", marginRight: "20px" }}>
                    <p style={{ paddingBottom: "20px" }}>{data.Description}</p>
                    <div>
                        <h1>Q1. Answer the following</h1>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Search style={{ width: "100%", marginLeft: "0" }} />
                            <button
                                style={{
                                    padding: "10px 15px",
                                    backgroundColor: "#ff6b08",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Submit Answer
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
                        widows: "100%",
                        height: "60px",

                        backgroundColor: "#131313",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "15px",
                    }}
                    onClick={() => {
                        if (hidden === 0) {
                            setHidden(1);
                        } else {
                            setHidden(0);
                        }
                    }}
                >
                    <h1 style={{ fontSize: "20px" }}>Solution</h1>
                    <label style={{ paddingLeft: "7px", fontSize: "20px" }}>^</label>
                </div>
                <div
                    style={{
                        width: "100%",
                        padding: "20px",
                        backgroundColor: "#1A1C1D",
                    }}
                    id="SolutionHolder"
                >
                    <p>{data.solution}</p>
                </div>
            </div>
        </Wrapper>
    );
}
