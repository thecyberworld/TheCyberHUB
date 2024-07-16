import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "src/components/index";
import Reconage from "src/components/Tools/Reconage/Reconage.jsx";
import Scans from "src/components/Tools/Reconage/Scans.jsx";
import ReconageSidebar from "src/components/Tools/Reconage/ReconageSidebar.jsx";

const ReconageRoutes = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
                transition: "background-color 0.3s ease",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "20px",
                overflowX: "hidden",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#f7f7f7 #212121",
            }}
        >
            <ReconageSidebar />

            <Routes>
                <Route index element={<Reconage />} />

                <Route path={"scans"} element={<Scans />} />

                <Route path={"*"} element={<NotFound />} />
                <Route element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default ReconageRoutes;
