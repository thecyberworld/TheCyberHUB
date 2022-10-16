import React from "react";
import { Section } from "../WriteUps/WriteUpsElements";
import CTFElements from "./CTFElements";
import "./CTF.css";
import { useState } from "react";

// const CtfsData = {
//     title: "TheCyberCTF",
//     date: "October 8 2022",
//     venue: <a style={{ color: "white" }} href={"https://discord.gg/QHBPq6xP5p"} target={"_blank"}>Discord</a>,
//     content: <p>
//         We host every weekend for the community for free. Take participate in the CTF and win exciting prizes and this is free for everyone.<br />Join Discord now."
//     </p>
// }

const CTF = () => {
    const number=193471289037
    const [value, setValue] = useState(null)
    const [correct,setCorrect]=useState(false)
    console.log(value)
    const handleClick=()=>{
        value==number?setCorrect(true):setCorrect(false)
    }
    return (
        <Section>
            {/* <h1> Join the discord link to participate </h1> */}
            <br />
            <div className="AllEvents">
                {/* <CTFElements venue={CtfsData.venue} date={CtfsData.date} content={CtfsData.content}/> */}
                <div className="flex flex-col m-4">
                    <label htmlFor="value" className="text-2xl font-semibold">Enter value:</label>
                    <input type="text" id="value" className="text-black m-4 px-[8px] h-8 w-52 rounded-sm font-semibold"
                        value={value} onChange={e => setValue(e.target.value)}></input>
                    {correct? <button className="bg-green-600 border border-white text-lg w-28 h-[40px] rounded-md font-semibold self-center m-4 hover:scale-110" onClick={handleClick}>Submit</button>:<button className="bg-black border-solid border border-white text-green-500 text-lg w-28 h-[40px] rounded-md font-semibold self-center m-4 hover:scale-110" onClick={handleClick}>Submit</button>}
                    {correct?<p>Congratulations!</p>:null}
                </div>
            </div>
        </Section>
    );
};

export default CTF;