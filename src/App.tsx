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
import { handleGetParkings } from "./utils/parking-utils";
import { Listing } from "./types/global.types";
import { useDispatch } from "react-redux";
import { setSearchResults } from "./redux/search-slice";

import BlogsLandingPage from "./pages/blogs/blogs.landing-page";
import BenefitsOfRentingAGaragePage from "./pages/blogs/benefits-of-renting-a-garage.page";
import HowToRentYourSpacePage from "./pages/blogs/how-to-rent-your-space.page";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initAmplitude();
  }, []);

  // fetch listings from backend
  useEffect(() => {
    handleGetParkings()
      .then((res) => {
        const fetchedListings: Listing[] = res.data;
        dispatch(setSearchResults(fetchedListings));
      })
      .catch((error) => {
        console.error("Error fetching listings", error);
      });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <NavbarHeader />
        <Routes>
          <Route
            path="/blogs/how-to-rent-your-space"
            element={<HowToRentYourSpacePage />}
          />
          <Route
            path="/blogs/benefits-of-renting-a-garage"
            element={<BenefitsOfRentingAGaragePage />}
          />
          <Route
            path="/blogs"
            element={<BlogsLandingPage />}
          />
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
