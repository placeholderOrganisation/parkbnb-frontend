import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import defaultTheme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

import { Test } from "./pages/test";
import SignUp from "./pages/auth/sign-up.page";
import SignIn from "./pages/auth/sign-in.page";
import NewListingForm from "./pages/create-listing/create-listing.page";
import GetListing from "./pages/get-listings/get-listing.page";
import NavbarHeader from "./components/navbar/navbar-header.component";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <NavbarHeader />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/test" element={<Test />} />
          <Route path="/create-listing" element={<NewListingForm />} />
          <Route path="/" element={<GetListing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
