
"use client";

import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";
import { HorizontalStackedbar } from "./AnalyticsStackedBarElements";

export default function HorizontalStackedBar() {
  return (
    <HorizontalStackedbar>
      <div style={{ width: "100%",  marginBottom: "5px" }}>
        <HSBar
          height={25}
          outlineWidth={1.5}
          outlineColor="#151414"
          showTextUp
          fontColor="rgb(50,20,100)"
          data={[
            {
              // name: "Mobile Phone",
              value: 65,
              description: "65%",
              color: "blue",
            },
            {
              // name: "Desktop",
              value: 35,
              description: "35%",
              color: "rgb(255, 205, 86)",
            },
          ]}
        />
      </div>
    </HorizontalStackedbar>
  );
}
