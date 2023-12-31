import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../index";
import CheatSheets from "./CheatSheets";
import HackBook from "./HackBook/HackBook";
import SecureBook from "./SecureBook/SecureBook";
import Linux from "./Linux/Linux";
import Windows from "./Windows/Windows";

const CheatSheetsRoutes = () => {
    return (
        <Routes>
            <Route index element={<CheatSheets />} />
            <Route path={"/hacking"} element={<HackBook />} />
            <Route path={"/security"} element={<SecureBook />} />
            <Route path={"/linux"} element={<Linux />} />
            <Route path={"/windows"} element={<Windows />} />

            <Route path={"*"} element={<NotFound />} />
            <Route element={<NotFound />} />
        </Routes>
    );
};

export default CheatSheetsRoutes;
