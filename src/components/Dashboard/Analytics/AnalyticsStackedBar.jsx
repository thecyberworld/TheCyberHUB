import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
import { HorizontalStackedbar } from "./AnalyticsStackedBarElements";
import { horizontalStackedBardata } from "./AnalyticsUtils";

export default function HorizontalStackedBar() {
    return (
        <HorizontalStackedbar style={{ width: "100%", marginBottom: "5px" }}>
            <div style={{ width: "100%", marginBottom: "5px" }}>
                <HSBar
                    height={30}
                    outlineWidth={1.5}
                    outlineColor="#151414"
                    showTextUp
                    fontColor="rgb(50,20,100)"
                    data={horizontalStackedBardata}
                />
            </div>
        </HorizontalStackedbar>
    );
}
