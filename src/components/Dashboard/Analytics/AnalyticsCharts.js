/* eslint-disable react/display-name */
import React from "react";
import Barcharts from "./AnalyticsBarChart";
import Stackedbar from "./AnalyticsStackedBar";
import Doughnuts from "./AnalyticsDoughnutChart";


const Components = {
  barchart: Barcharts,
  stackedbar: Stackedbar,
  doughnut: Doughnuts
};

export default block => {
  // component does exist
  if (typeof Components[block.component] !== "undefined") {
    return React.createElement(Components[block.component], {
      key: block._uid,
      block,
    });
  }
  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {block.component} has not been created yet.</div>,
    { key: block._uid }
  );
}