import React from "react";
import ReactDOM from "react-dom/client";
import {
    // BrowserRouter,
    HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
// import { hydrate, render } from "react-dom";

import App from "./App";
import "./index.css";
import store from "./app/store";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
    <>
        <React.StrictMode>
            {/* <BrowserRouter> */}
            <HashRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>
            {/* </BrowserRouter> */}
        </React.StrictMode>
    </>,
);

// For SEO
// if (rootElement.hasChildNodes()) {
//   hydrate(
//     <>
//       <BrowserRouter>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </>,
//     rootElement,
//   );
// } else {
//   render(
//     <>
//       <BrowserRouter>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     </>,
//     rootElement,
//   );
// }
