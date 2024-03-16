import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "src/components/index";
import Feeds from "./Feeds";
import FeedPage from "./FeedPage/FeedPage";

const FeedsRoute = () => {
    return (
        <Routes>
            <Route index element={<Feeds />} />
            <Route path={":feedId"} element={<FeedPage />} />
            <Route path={"*"} element={<NotFound />} />
        </Routes>
    );
};

export default FeedsRoute;
