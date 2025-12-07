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

// Marvel Style Constants
const COMIC_BORDER_WIDTH = "3px";
const COMIC_INK_COLOR = "#121212"; // 거의 완전한 검정
const HARD_SHADOW = `4px 4px 0px ${COMIC_INK_COLOR}`; // 부드럽지 않은 딱딱한 그림자

const theme = createTheme({
  palette: {
    // Iron Man 테마: 아이언맨의 상징적인 레드와 골드
    primary: {
      main: "#ED1D24", // Iron Man Red (Mark 3 슈트 색상)
      dark: "#C30000",
      light: "#FF5F52",
      contrastText: "#FFFFFF",
    },
    // 아이언맨 아크 리액터 골드
    secondary: {
      main: "#FFD700", // Arc Reactor Gold
      dark: "#C7A300",
      light: "#FFFF52",
      contrastText: COMIC_INK_COLOR,
    },
    background: {
      default: "#FFF8E7", // 클래식 코믹북 바랜 종이 색상 (따뜻한 크림)
      paper: "#FFFEF5", // 컷(Panel) 배경 (밝은 아이보리)
    },
    text: {
      primary: COMIC_INK_COLOR, // 잉크색
      secondary: "#424242",
    },
    action: {
      hoverOpacity: 0.08,
    },
  },
  typography: {
    // 기본은 강하고 좁은 Roboto Condensed
    fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    htmlFontSize: 16,
    // 헤드라인은 코믹북 스타일의 'Bangers' 폰트 적용
    h1: {
      fontFamily: '"Bangers", cursive',
      fontSize: "4.5rem", // 매우 크고 과장되게
      letterSpacing: "0.05em",
      textTransform: "uppercase", // 무조건 대문자
      color: COMIC_INK_COLOR,
      textShadow: `2px 2px 0px ${COMIC_INK_COLOR}, 4px 4px 0px #ED1D24`, // 이중 그림자 효과
    },
    h2: {
      fontFamily: '"Bangers", cursive',
      fontSize: "3.5rem",
      textTransform: "uppercase",
      color: COMIC_INK_COLOR,
    },
    h3: {
      fontFamily: '"Bangers", cursive',
      fontSize: "2.5rem",
      textTransform: "uppercase",
    },
    h4: {
      // H4부터는 가독성을 위해 Roboto Condensed의 가장 굵은 웨이트 사용
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700,
      fontSize: "2rem",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    },
    h5: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700,
      fontSize: "1.5rem",
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700,
      textTransform: "uppercase",
    },
    button: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700,
      fontSize: "1.1rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    body1: {
      fontWeight: 500, // 본문도 약간 힘있게
    },
  },
  spacing: BASE_UNIT,
  shape: {
    // 둥근 모서리를 제거하여 날카롭고 강한 느낌
    borderRadius: 2,
  },
  components: {
    // *** 핵심: 모든 컴포넌트에 만화 잉크펜 테두리 적용 ***
    MuiPaper: {
      styleOverrides: {
        root: {
          // 만화책 패널처럼 보이게 설정
          border: `${COMIC_BORDER_WIDTH} solid ${COMIC_INK_COLOR}`,
          boxShadow: HARD_SHADOW, // 딱딱한 그림자
        },
        elevation1: {
          boxShadow: HARD_SHADOW,
        },
        elevation2: {
          boxShadow: `6px 6px 0px ${COMIC_INK_COLOR}`,
        },
        // ... 필요한 elevation 만큼 추가 정의
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // 버튼도 만화 패널처럼
          border: `${COMIC_BORDER_WIDTH} solid ${COMIC_INK_COLOR}`,
          borderRadius: 0, // 완전 사각형
          boxShadow: HARD_SHADOW,
          padding: "10px 24px",
          transition: "all 0.1s ease-in-out",
          "&:hover": {
            // 호버 시 그림자가 눌리는 듯한 효과
            transform: "translate(2px, 2px)",
            boxShadow: `2px 2px 0px ${COMIC_INK_COLOR}`,
          },
          "&:active": {
            transform: "translate(4px, 4px)",
            boxShadow: "none",
          },
        },
        containedPrimary: {
          // Primary 버튼은 빨간색 배경에 검은 테두리 유지
          "&:hover": {
            backgroundColor: "#C30000", // 더 진한 레드
          },
        },
        outlined: {
          // Outlined 버튼도 두꺼운 테두리 적용
          border: `${COMIC_BORDER_WIDTH} solid ${COMIC_INK_COLOR}`,
          "&:hover": {
            border: `${COMIC_BORDER_WIDTH} solid ${COMIC_INK_COLOR}`,
            backgroundColor: "rgba(0,0,0,0.05)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // Card는 MuiPaper를 상속받으므로 기본적으로 테두리와 그림자가 적용됨
          // 여기서는 둥근 모서리만 확실히 제거
          borderRadius: 0,
          overflow: "visible", // 하드 쉐도우가 잘리지 않도록
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // 입력 필드도 만화 스타일로
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            "& fieldset": {
              borderWidth: COMIC_BORDER_WIDTH,
              borderColor: COMIC_INK_COLOR,
            },
            "&:hover fieldset": {
              borderColor: COMIC_INK_COLOR, // 호버 색상 변경 방지
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ED1D24", // 포커스 시 마블 레드
              borderWidth: COMIC_BORDER_WIDTH,
              boxShadow: `4px 4px 0px #ED1D24`, // 포커스 시 빨간 하드 쉐도우
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: `${COMIC_BORDER_WIDTH} solid ${COMIC_INK_COLOR}`,
          boxShadow: "none", // AppBar는 하드 쉐도우 대신 테두리만
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          // 아코디언도 패널처럼
          borderRadius: 0,
          border: `${COMIC_BORDER_WIDTH} solid ${COMIC_INK_COLOR}`,
          boxShadow: HARD_SHADOW,
          marginBottom: BASE_UNIT * 2,
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
            marginBottom: BASE_UNIT * 2,
          },
        },
      },
    },
  },
});

// Export for use in components
export { PHI, spacing, BASE_FONT_SIZE, BASE_UNIT };

export default theme;
