import React from "react";
import { Route, Routes } from "react-router-dom";
import Tools from "./Tools";
import BreachCheck from "./BreachCheck/BreachCheck";
import SubdomainFinder from "./SubdomainFinder/SubdomainFinder";
import ReverseShellGenrator from "./ReverseShell/ShellGenerator";
import { NotFound } from "../index";

const ToolsRoutes = () => {
    return (
        <Routes>
            <Route index element={<Tools />} />
            <Route path={"/breachcheck"} element={<BreachCheck />} />
            <Route path={"/subfinder"} element={<SubdomainFinder />} />
            <Route path={"/revshell"} element={<ReverseShellGenrator />} />
            {/* <Route path={"portScanner"} element={<PortScanner/>}/> */}
            <Route path={"*"} element={<NotFound />} />
            <Route element={<NotFound />} />
        </Routes>
    );
};

export default ToolsRoutes;
