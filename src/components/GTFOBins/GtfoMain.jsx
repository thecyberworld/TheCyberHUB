import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import React, { useState, useEffect } from "react";
import { Data } from "./Data";
// import { Search } from "../Labs/MainElement";
import { FunctionData } from "./_gtfoJson";

export default function GtfoBin() {
    const [activeFunction, setActiveFunction] = useState("All");

    useEffect(() => {}, [activeFunction]);

    function handleActiveFunction(data) {
        setActiveFunction(data);
    }

    return (
        <Wrapper style={{ width: "60%" }}>
            <label style={{ fontSize: "48px", fontWeight: "bold", letterSpacing: "5px" }}>BinExploit</label>

            <div style={{ display: "block", width: "100%", textAlign: "center", margin: "30px" }}>
                <button
                    style={{ padding: "10px", border: "solid 1px", margin: "10px" }}
                    onClick={() => {
                        handleActiveFunction("All");
                    }}
                >
                    All
                </button>

                {Object.keys(FunctionData).map((data) => (
                    <button
                        style={{ padding: "10px", border: "solid 1px", margin: "10px" }}
                        key={data}
                        onClick={() => {
                            handleActiveFunction(data);
                        }}
                    >
                        {data}
                    </button>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "30px",
                }}
            >
                {/* <Search
                    id="Search"
                    placeholder={"Search among " + Object.keys(Data[0]).length + " Binaries"}
                    style={{ marginBottom: "20px", marginLeft: "0" }}
                /> */}
                {Data.map((data, index) =>
                    Object.keys(data).map((keys) => {
                        if (activeFunction === "All") {
                            return (
                                <div style={{ display: "flex" }} key={keys}>
                                    <a
                                        style={{
                                            width: "180px",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            textDecorationLine: "underline",
                                        }}
                                        href={"/tools/binexploits/" + keys}
                                    >
                                        {keys}
                                    </a>
                                    <div style={{ display: "grid-row", width: "550px" }}>
                                        {Object.keys(data[keys].functions).map((function_) => (
                                            <button
                                                onClick={() => {
                                                    handleActiveFunction(function_);
                                                }}
                                                style={{ padding: "10px", border: "solid 1px", margin: "10px" }}
                                                key={function_}
                                            >
                                                {function_}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        } else {
                            if (Object.keys(data[keys].functions).find((func) => func === activeFunction)) {
                                return (
                                    <div style={{ display: "flex" }} key={keys}>
                                        <a
                                            style={{
                                                width: "180px",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                textDecorationLine: "underline",
                                            }}
                                            href={"/tools/binexploits/" + keys}
                                        >
                                            {keys}
                                        </a>
                                        <div style={{ display: "grid-row", width: "550px" }}>
                                            {Object.keys(data[keys].functions).map((function_) => (
                                                <button
                                                    onClick={() => {
                                                        handleActiveFunction(function_);
                                                    }}
                                                    style={{ padding: "10px", border: "solid 1px", margin: "10px" }}
                                                    key={function_}
                                                >
                                                    {function_}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        }
                        return null;
                    }),
                )}
            </div>
        </Wrapper>
    );
}
