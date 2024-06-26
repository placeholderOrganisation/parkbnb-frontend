import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import defaultTheme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

import SignUp from "./pages/auth/sign-up.page";
import SignIn from "./pages/auth/sign-in.page";
import NewListingForm from "./pages/create-listing/create-listing.page";
import GetListing from "./pages/get-listings/get-listing.page";
import NavbarHeader from "./components/navbar/navbar-header.component";
import AuthTransition from "./pages/transition/auth-transition.page";
import ListingCard from "./pages/listing-card-open/listing-card.page";
import UserListings from "./pages/user/user-listings.page";
import { initAmplitude } from "./utils/amplitude-utils";
import LandingPage from "./pages/landing/landing.page";

const App = () => {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <NavbarHeader />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/transition" element={<AuthTransition />} />
          <Route path="/create-listing" element={<NewListingForm />} />
          <Route path="/listings/" element={<GetListing />} />
          <Route path="/listing/:listingId" element={<ListingCard />} />
          <Route path="/user/:userId/listing" element={<UserListings />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
