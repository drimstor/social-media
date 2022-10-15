import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import "./firebase";
import { PersistGate } from "redux-persist/integration/react";
import SideBarLayout from "components/Layouts/SideBarLayout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SideBarLayout>
            <App />
          </SideBarLayout>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
