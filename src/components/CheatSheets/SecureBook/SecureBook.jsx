import React from "react";
import CheatSheet from "src/components/CheatSheets/CheatSheet";
import secureBook from "./SecureBookData/securebook.json";

const SecureBook = () => {
    return <CheatSheet data={secureBook} heading={"Secure Book"} />;
};

export default SecureBook;
