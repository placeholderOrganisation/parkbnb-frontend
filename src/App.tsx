import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import defaultTheme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

import SignUp from "./pages/auth/sign-up.page";
import SignIn from "./pages/auth/sign-in.page";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
