import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { useParams, useNavigate } from "react-router";
import React from "react";
import { Data } from "./Data";
import { FunctionData } from "./_gtfoJson";
import { IoArrowBack } from "react-icons/io5";

export default function DataPage() {
    const Navigator = useNavigate();
    const { id } = useParams();
    const DataFunction = Object.keys(Data[0][id].functions);

    return (
        <Wrapper style={{ width: "80%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <button
                    style={{ padding: "5px" }}
                    onClick={() => {
                        Navigator("/tools/binexploits");
                    }}
                >
                    <IoArrowBack />
                </button>
                <h1>/{id}</h1>
            </div>
            <div>
                {DataFunction.map((data) => (
                    <div key={data}>
                        <h1>{FunctionData[data].label}</h1>
                        <p>{FunctionData[data].description}</p>
                        <pre
                            className="codeSection"
                            style={{ margin: "10px", padding: "20px", backgroundColor: "rgb(26, 28, 29)" }}
                        >
                            <code>{Data[0][id].functions[data][0].code}</code>
                        </pre>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}
