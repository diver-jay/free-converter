import { Box, Container } from "@mui/material";
import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: "80px",
      }}
    >
      <Header />

      <Container maxWidth="md">{children}</Container>

      <Footer />
    </Box>
  );
}

export default Layout;
