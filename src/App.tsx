import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import defaultTheme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

import SignUp from "./pages/auth/sign-up.page";
import SignIn from "./pages/auth/sign-in.page";
import { Test } from "./pages/test";
import NewListingForm from "./pages/listings/create-listing.page";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
          <Route path="/create-listing" element={<NewListingForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
