import { Box, Typography } from "@mui/material";
import LanguageSwitcher from "../features/language-switcher/language-switcher";

function Header() {
  return (
    <Box
      sx={{
        background: "white",
        height: {
          xs: "56px",
          md: "88px",
        },
        px: {
          xs: "24px",
          md: "88px",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="black">
        Open convert
      </Typography>
      <LanguageSwitcher />
    </Box>
  );
}

export default Header;
