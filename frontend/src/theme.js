import { createTheme } from "@mui/material/styles";

// Golden Ratio = 1.618
const PHI = 1.618;
const BASE_UNIT = 8;

// Golden Ratio based spacing scale (Fibonacci sequence)
const spacing = {
  xs: BASE_UNIT, // 8px
  sm: BASE_UNIT * PHI, // 13px
  md: BASE_UNIT * PHI * PHI, // 21px
  lg: BASE_UNIT * PHI * PHI * PHI, // 34px
  xl: BASE_UNIT * PHI * PHI * PHI * PHI, // 55px
  xxl: BASE_UNIT * PHI * PHI * PHI * PHI * PHI, // 89px
};

// Golden Ratio based typography scale
const BASE_FONT_SIZE = 16;

const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      dark: "#5568d3",
      light: "#8899f0",
      lighter: "#e8ebf9",
    },
    secondary: {
      main: "#764ba2",
      dark: "#5d3b82",
      light: "#916fc5",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "SamsungOne",
    fontSize: BASE_FONT_SIZE,
    // Golden Ratio Typography Scale
    h1: {
      fontSize: `${BASE_FONT_SIZE * PHI * PHI * PHI}px`, // 68px
      fontWeight: 700,
      lineHeight: PHI,
    },
    h2: {
      fontSize: `${BASE_FONT_SIZE * PHI * PHI}px`, // 42px
      fontWeight: 700,
      lineHeight: PHI,
    },
    h3: {
      fontSize: `${BASE_FONT_SIZE * PHI * 1.5}px`, // 39px
      fontWeight: 700,
      lineHeight: PHI,
    },
    h4: {
      fontSize: `${BASE_FONT_SIZE * PHI}px`, // 26px
      fontWeight: 600,
      lineHeight: PHI,
    },
    h5: {
      fontSize: `${BASE_FONT_SIZE * 1.25}px`, // 20px
      fontWeight: 600,
      lineHeight: PHI,
    },
    h6: {
      fontSize: `${BASE_FONT_SIZE * 1.125}px`, // 18px
      fontWeight: 500,
      lineHeight: PHI,
    },
    body1: {
      fontSize: `${BASE_FONT_SIZE}px`, // 16px
      lineHeight: PHI,
    },
    body2: {
      fontSize: `${BASE_FONT_SIZE / 1.125}px`, // 14px
      lineHeight: PHI,
    },
    caption: {
      fontSize: `${BASE_FONT_SIZE / PHI}px`, // 10px
      lineHeight: PHI,
    },
  },
  spacing: BASE_UNIT,
  shape: {
    borderRadius: BASE_UNIT * 1.5, // 12px
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: BASE_UNIT,
          padding: `${spacing.sm}px ${spacing.md}px`, // 13px 21px
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BASE_UNIT * 2, // 16px
        },
      },
    },
  },
});

// Export for use in components
export { PHI, spacing, BASE_FONT_SIZE, BASE_UNIT };

export default theme;
