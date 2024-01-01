import React from "react";
import CheatSheet from "../CheatSheet";
import hackBook from "./HackBookData/hackbook.json";

const HackBook = () => {
    console.log(hackBook);
    return <CheatSheet data={hackBook} heading={"Hack Book"} />;
};

export default HackBook;
