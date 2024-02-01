import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../index";
import WebSecurity from "./WebSecurity";
import Labs from "./Labs/Labs";
import Room from "./Labs/LabsRoom/LabsRoom";
import SubHeader from "./SubHeader";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import Topics from "./Topics/Topics";
import Topic from "./Topics/Topic";

const WebSecurityRoutes = () => {
    const subHeaderData = [
        { id: 1, title: "Topics", link: "topics" },
        { id: 2, title: "Labs", link: "labs" },
        { id: 3, title: "Resources", link: "./" },
        // {
        //     id: 2, title: 'Content', link: 'labs', isDropdown: true, dropdownOptions: [
        //         {id: 21, title: 'All Topics', link: './'},
        //         {id: 22, title: 'All Labs', link: './'},
        //     ]
        // },
    ];

    return (
        <Wrapper style={{ marginTop: "90px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <SubHeader heading={"Web Security"} subHeaderData={subHeaderData} />
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1200px",
                    }}
                >
                    <Routes>
                        <Route index element={<WebSecurity />} />

                        <Route path={"topics"} element={<Topics />} />
                        <Route path={"topic/:id"} element={<Topic />} />

                        <Route path={"labs"} element={<Labs />} />
                        <Route path={"labs/:id"} element={<Room />} />

                        <Route path={"*"} element={<NotFound />} />
                        <Route element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Wrapper>
    );
};

export default WebSecurityRoutes;
