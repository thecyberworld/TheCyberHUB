import { StartMachineButton, DescriptionTitle } from "./MainPageElement";
import QuestionAnswerComponent from "./QuestionAnswerComponent";
import { FaPlay } from "react-icons/fa";
import React from "react";

export default function QuestionAnswer() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "5px" }}>
                <div>
                    <DescriptionTitle>Description</DescriptionTitle>
                </div>
                <div>
                    <StartMachineButton>
                        <FaPlay style={{ margin: "3px" }} />
                        Play Machine
                    </StartMachineButton>
                </div>
            </div>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloremque a totam, tempora nam
                obcaecati reprehenderit doloribus quisquam harum ab. Incidunt cupiditate maiores consequatur sit?
                Aperiam est quidem quibusdam provident?
            </p>
            <DescriptionTitle>Answer The Question Below</DescriptionTitle>
            <QuestionAnswerComponent></QuestionAnswerComponent>
        </div>
    );
}
