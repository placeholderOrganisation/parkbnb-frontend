import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./app"; // Update the import statement to use the correct file name
import store from "./redux/user/user-store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
