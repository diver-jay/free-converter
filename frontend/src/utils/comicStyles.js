/**
 * Daily Bugle Blue Edition - Comic UI Utilities
 * 변환 프로세스를 위한 재사용 가능한 스타일 컴포넌트
 */

import {
  COMIC_INK,
  ACTION_BLUE,
  ACCENT_YELLOW,
  THICK_BORDER,
} from "../theme";

/**
 * Success Badge Style
 * 변환 완료 시 표시: "READY TO DOWNLOAD!"
 */
export const successBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 24px",
  background: ACCENT_YELLOW,
  color: COMIC_INK,
  fontFamily: '"Roboto Condensed", sans-serif',
  fontWeight: 700,
  fontSize: "1.2rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  border: `${THICK_BORDER} solid ${COMIC_INK}`,
  boxShadow: `4px 4px 0px ${COMIC_INK}`,
  transition: "all 0.1s",

  "&::before": {
    content: '"✓"',
    fontSize: "1.5rem",
    fontWeight: 700,
  },

  "&:hover": {
    transform: "translate(-2px, -2px)",
    boxShadow: `6px 6px 0px ${COMIC_INK}`,
  },
};

/**
 * Loading Caption Style
 * 변환 중 표시: "DATA TRANSMISSION..."
 */
export const loadingCaptionStyle = {
  position: "relative",
  padding: "16px 24px",
  background: ACTION_BLUE,
  color: "#FFFFFF",
  fontFamily: '"Roboto Condensed", sans-serif',
  fontWeight: 700,
  fontSize: "1rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
  border: `${THICK_BORDER} solid ${COMIC_INK}`,
  boxShadow: `4px 4px 0px ${COMIC_INK}`,
  textAlign: "center",
  animation: "pulse 1.5s infinite",

  // 코믹북 하단 자막(Caption) 박스 스타일
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `repeating-linear-gradient(
      90deg,
      transparent,
      transparent 10px,
      ${COMIC_INK}11 10px,
      ${COMIC_INK}11 12px
    )`,
    pointerEvents: "none",
  },
};

/**
 * Error Badge Style
 * 변환 실패 시 표시: "CONVERSION FAILED"
 */
export const errorBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 24px",
  background: "#FF4444",
  color: "#FFFFFF",
  fontFamily: '"Roboto Condensed", sans-serif',
  fontWeight: 700,
  fontSize: "1.2rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  border: `${THICK_BORDER} solid ${COMIC_INK}`,
  boxShadow: `4px 4px 0px ${COMIC_INK}`,

  "&::before": {
    content: '"⚠"',
    fontSize: "1.5rem",
  },
};

/**
 * Progress Bar Style
 * 깔끔한 블루 프로그레스 바
 */
export const progressBarStyle = {
  width: "100%",
  height: "20px",
  background: "#F8F9FA",
  border: `${THICK_BORDER} solid ${COMIC_INK}`,
  borderRadius: 0,
  overflow: "hidden",
  position: "relative",

  "& .progress-fill": {
    height: "100%",
    background: ACTION_BLUE,
    transition: "width 0.3s ease-in-out",
    position: "relative",

    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `repeating-linear-gradient(
        90deg,
        transparent,
        transparent 8px,
        rgba(255, 255, 255, 0.2) 8px,
        rgba(255, 255, 255, 0.2) 10px
      )`,
    },
  },
};

/**
 * File Drop Zone Style
 * 파일을 드래그 앤 드롭하는 영역
 */
export const dropZoneStyle = {
  padding: "60px 40px",
  background: "#FFFFFF",
  border: `3px dashed ${ACTION_BLUE}`,
  borderRadius: 0,
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
  cursor: "pointer",

  "&:hover": {
    background: "#F8F9FA",
    borderColor: COMIC_INK,
    transform: "scale(1.01)",
  },

  "&.active": {
    background: `${ACTION_BLUE}11`,
    borderColor: ACTION_BLUE,
    borderStyle: "solid",
    boxShadow: `inset 0 0 20px ${ACTION_BLUE}22`,
  },
};

/**
 * File Card Style
 * 변환된 파일을 표시하는 카드
 */
export const fileCardStyle = {
  padding: "20px",
  background: "#FFFFFF",
  border: `${THICK_BORDER} solid ${COMIC_INK}`,
  boxShadow: `4px 4px 0px ${ACTION_BLUE}`,
  borderRadius: 0,
  transition: "all 0.1s",

  "&:hover": {
    transform: "translate(-2px, -2px)",
    boxShadow: `6px 6px 0px ${ACTION_BLUE}`,
  },
};

/**
 * Action Button Style (Primary)
 * 주요 액션 버튼 (다운로드, 변환 등)
 */
export const primaryActionButton = {
  padding: "14px 32px",
  background: ACTION_BLUE,
  color: "#FFFFFF",
  fontFamily: '"Roboto Condensed", sans-serif',
  fontWeight: 700,
  fontSize: "1.1rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  border: `${THICK_BORDER} solid ${COMIC_INK}`,
  boxShadow: `3px 3px 0px ${COMIC_INK}`,
  borderRadius: 0,
  cursor: "pointer",
  transition: "all 0.1s",

  "&:hover": {
    transform: "translate(-1px, -1px)",
    boxShadow: `5px 5px 0px ${COMIC_INK}`,
  },

  "&:active": {
    transform: "translate(2px, 2px)",
    boxShadow: "none",
  },

  "&:disabled": {
    background: "#E0E0E0",
    color: "#999999",
    cursor: "not-allowed",
    "&:hover": {
      transform: "none",
      boxShadow: `3px 3px 0px ${COMIC_INK}`,
    },
  },
};

/**
 * Section Header Style
 * 섹션 제목 스타일
 */
export const sectionHeaderStyle = {
  fontFamily: '"Bangers", cursive',
  fontSize: "2.5rem",
  color: COMIC_INK,
  letterSpacing: "0.02em",
  marginBottom: "24px",
  textTransform: "uppercase",

  // 언더라인 효과
  "&::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    background: ACTION_BLUE,
    marginTop: "12px",
  },
};

/**
 * Info Tag Style
 * 정보 표시 태그 (파일 크기, 형식 등)
 */
export const infoTagStyle = (color = ACTION_BLUE) => ({
  display: "inline-block",
  padding: "4px 12px",
  background: `${color}22`,
  color: color === ACCENT_YELLOW ? COMIC_INK : color,
  fontFamily: '"Roboto Condensed", sans-serif',
  fontWeight: 600,
  fontSize: "0.85rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  border: `2px solid ${color === ACCENT_YELLOW ? COMIC_INK : color}`,
  borderRadius: 0,
  marginRight: "8px",
});

/**
 * CSS Animations (styled-components나 @emotion에서 사용)
 */
export const keyframes = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;
