import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import SideBarLayout from "components/Layouts/SideBarLayout";
import { CachedAvatarProvider } from "contexts/CacheAvatarContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SideBarLayout>
          <CachedAvatarProvider>
            <App />
          </CachedAvatarProvider>
        </SideBarLayout>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
