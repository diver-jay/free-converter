import { Box } from "@mui/material";
import LanguageSwitcher from "./languageSwitcher";

function Header() {
  return (
    <Box
      sx={{
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
        justifyContent: "flex-end",
      }}
    >
      <LanguageSwitcher />
    </Box>
  );
}

export default Header;
