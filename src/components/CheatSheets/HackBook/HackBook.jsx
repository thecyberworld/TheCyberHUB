import React from "react";
import CheatSheet from "src/components/CheatSheets/CheatSheet";
import hackBook from "./HackBookData/hackbook.json";

const HackBook = () => {
    return <CheatSheet data={hackBook} heading={"Hack Book"} />;
};

export default HackBook;
