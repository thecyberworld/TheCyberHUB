import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CtfLikeButton, Ctftitle, DifficultyLevelLabel, MenuButton, QuestionConatiner } from "./MainPageElement";
import { MdComputer } from "react-icons/md";
import React from "react";
import CTFLeaderboard from "src/components/CaptureTheFlag/CTFLeaderboard/CTFLeaderboard";
import QuestionAnswer from "./QuestionAnswer";
import { GoArrowUpRight } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

export default function MainPage() {
    return (
        <Wrapper style={{ width: "100vw" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "75%", paddingBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <MdComputer style={{ width: "80px", height: "80px", marginRight: "10px" }} />
                    <div>
                        <Ctftitle>Basic Pentesting</Ctftitle>
                        <p>This is a machine that allows you to practise web app hacking and privilege escalation</p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <DifficultyLevelLabel>Beginner</DifficultyLevelLabel>
                    <CtfLikeButton>
                        <CiHeart style={{ width: "25px", height: "25px" }} />
                    </CtfLikeButton>
                </div>
            </div>
            <div style={{ width: "78%", marginBottom: "10px", display: "flex" }}>
                <MenuButton style={{ backgroundColor: "rgb(19, 19, 19)" }}>Play Machine</MenuButton>
                <MenuButton style={{ display: "flex", backgroundColor: "rgb(19, 19, 19)" }}>
                    Walkthrough <GoArrowUpRight style={{ marginLeft: "3px", marginTop: "3px" }} />
                </MenuButton>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <QuestionConatiner>
                    <QuestionAnswer />
                </QuestionConatiner>
                <div style={{ marginLeft: "20px" }}>
                    <div
                        className="bg-[#1a1c1d] text-white p-5 rounded-lg max-w-md mx-auto "
                        style={{ marginBottom: "20px" }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Get Your Certificate</h2>
                                <p className="text-sm mt-1">You have not completed this CTF yet!</p>
                            </div>
                            <img
                                src="https://file.rendit.io/n/tadczxrp6riMNAspa9St.png"
                                alt="Lock Icon"
                                className="h-6 w-6"
                            />
                        </div>
                        <button className="bg-[#000000] text-white px-4 py-2 rounded shadow hover:bg-opacity-80 transition duration-150">
                            Download
                        </button>
                    </div>
                    <CTFLeaderboard />
                </div>
            </div>
        </Wrapper>
    );
}
