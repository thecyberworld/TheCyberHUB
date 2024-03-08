import React from "react";

import WindowsData from "./windowsData.json";
import CheatSheet from "src/components/CheatSheets/CheatSheet";

const Windows = () => {
    return (
        <div>
            <CheatSheet heading={"Windows"} data={WindowsData} />
        </div>
    );
};

export default Windows;
