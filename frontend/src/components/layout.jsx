import { Box, Container } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import { spacing } from "../theme";

function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header />

      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          py: `${spacing.lg}px`,
          maxWidth: "730px",
        }}
      >
        {children}
      </Container>

      <Footer />
    </Box>
  );
}

export default Layout;
