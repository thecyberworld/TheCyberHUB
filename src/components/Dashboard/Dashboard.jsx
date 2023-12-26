import React from "react";
import { Wrapper } from "./Profile/ProfileElements";
import { DashboardContainer } from "./DashboardElements";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";
// import AuthPopup from "../../pages/AuthPopup/AuthPopup";

const Dashboard = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    // const [isLoading, setIsLoading] = useState(false);

    if (isApiLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <DashboardContainer>{/* <DashboardItems /> */}</DashboardContainer>
        </Wrapper>
    );
};

export default Dashboard;
