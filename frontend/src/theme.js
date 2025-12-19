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

// Daily Bugle Blue Edition - Modern Editorial Comics
const COMIC_INK = "#1A1A1B"; // 너무 새검정보다는 깊은 다크 그레이
const ACTION_BLUE = "#0052FF"; // 신뢰를 주는 현대적인 블루
const ACCENT_YELLOW = "#FFD600"; // 주의/완료를 나타내는 코믹스 포인트
const THICK_BORDER = "2.5px";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: ACTION_BLUE,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: ACCENT_YELLOW,
    },
    background: {
      default: "#FFFFFF", // 순수한 흰색으로 변경하여 가독성 높임
      paper: "#FFFFFF",
    },
    text: {
      primary: COMIC_INK,
      secondary: "#5F6368",
    },
  },
  typography: {
    fontFamily: '"Roboto Condensed", "Arial", sans-serif',
    h1: {
      fontFamily: '"Bangers", cursive',
      fontSize: "3.5rem", // 가독성을 위해 크기 조절
      color: COMIC_INK,
      letterSpacing: "0.02em",
    },
    h4: {
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    subtitle1: { // Logo 전용으로 활용
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: "2.5rem",
      letterSpacing: "-1px",
      lineHeight: 1,
      color: "#FFFFFF",
      backgroundColor: "#ED1D24", // 마블 시그니처 레드
      padding: "4px 8px",
      display: "inline-block",
      textTransform: "uppercase",
      border: `2px solid ${COMIC_INK}`,
    },
    button: {
      fontWeight: 700,
      letterSpacing: "1px",
    },
  },
  spacing: BASE_UNIT,
  shape: {
    // 둥근 모서리를 제거하여 날카롭고 강한 느낌
    borderRadius: 2,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: COMIC_INK,
          borderBottom: `3px solid ${COMIC_INK}`,
          boxShadow: "none",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderBottomWidth: "2px",
          borderColor: COMIC_INK,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // 아주 깔끔한 종이 질감의 망점 (거의 안 보일 듯 미세하게)
          backgroundImage: `radial-gradient(${COMIC_INK}11 0.8px, transparent 0.8px)`,
          backgroundSize: "24px 24px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `${THICK_BORDER} solid ${COMIC_INK}`,
          // 그림자를 '블루'로 주어 현대적인 마케팅 느낌 가미
          boxShadow: `6px 6px 0px ${ACTION_BLUE}`,
          padding: "24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `${THICK_BORDER} solid ${COMIC_INK}`,
          boxShadow: `3px 3px 0px ${COMIC_INK}`,
          transition: "all 0.1s",
          "&:hover": {
            transform: "translate(-1px, -1px)",
            boxShadow: `5px 5px 0px ${COMIC_INK}`,
            backgroundColor: ACTION_BLUE,
            color: "#fff",
          },
          "&:active": {
            transform: "translate(2px, 2px)",
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            backgroundColor: "#F8F9FA",
            "& fieldset": {
              borderWidth: THICK_BORDER,
              borderColor: COMIC_INK,
            },
            "&:hover fieldset": {
              borderColor: ACTION_BLUE,
            },
            "&.Mui-focused fieldset": {
              borderColor: ACTION_BLUE,
              boxShadow: `inset 4px 4px 0px ${ACTION_BLUE}11`,
            },
          },
        },
      },
    },
  },
});

// Export for use in components
export {
  PHI,
  spacing,
  BASE_FONT_SIZE,
  BASE_UNIT,
  COMIC_INK,
  ACTION_BLUE,
  ACCENT_YELLOW,
  THICK_BORDER,
};

export default theme;
