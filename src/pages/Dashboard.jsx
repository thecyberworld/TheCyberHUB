import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Wrapper } from "../components/Dashboard/Profile/ProfileElements";
import DashboardItems from "../components/Dashboard/DashboardItems";
import { DashboardContainer } from "../components/Dashboard/DashboardElements";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <Wrapper>
            <DashboardContainer>
                <section className={"heading"}>
                    <h1> Welcome {user && user.name} </h1>
                    <p> Goals Dashboard</p>
                </section>
                <DashboardItems />
            </DashboardContainer>
        </Wrapper>
    );
};

export default Dashboard;
