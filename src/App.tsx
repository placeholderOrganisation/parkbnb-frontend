import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import defaultTheme from "./theme/theme";
import SignUp from "./pages/auth/sign-up.page";
import SignIn from "./pages/auth/sign-in.page";


const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box>
        <SignUp />
      </Box>
    </ThemeProvider>
  );
};

export default App;
