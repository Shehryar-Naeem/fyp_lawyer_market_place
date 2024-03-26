import React from "react";
import ReactDOM from "react-dom/client";
import "flowbite-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PrimeReactProvider } from "primereact/api";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <SkeletonTheme baseColor="#AEAEAE" highlightColor="#D9D9D9">
      <PrimeReactProvider value={{ unstyled: true }}>
        <Provider store={store}>
          <App />
        </Provider>
      </PrimeReactProvider>
    </SkeletonTheme>
  </>
);

reportWebVitals();
