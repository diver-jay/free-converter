import { Box } from "@mui/material";

function Logo({ height = 40 }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <svg
        width={height}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left document */}
        <rect
          x="4"
          y="12"
          width="16"
          height="24"
          rx="2"
          fill="#2196F3"
          opacity="0.9"
        />
        <line x1="8" y1="18" x2="16" y2="18" stroke="white" strokeWidth="1.5" />
        <line x1="8" y1="22" x2="16" y2="22" stroke="white" strokeWidth="1.5" />
        <line x1="8" y1="26" x2="13" y2="26" stroke="white" strokeWidth="1.5" />

        {/* Arrow with circular motion */}
        <g transform="translate(24, 24)">
          <circle
            r="10"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="2"
            strokeDasharray="31.4 31.4"
            strokeDashoffset="7.85"
            opacity="0.3"
          />
          <path
            d="M -8 0 L 8 0"
            stroke="#FF6B6B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 4 -4 L 8 0 L 4 4"
            stroke="#FF6B6B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Right document */}
        <rect
          x="28"
          y="12"
          width="16"
          height="24"
          rx="2"
          fill="#4CAF50"
          opacity="0.9"
        />
        <line x1="32" y1="18" x2="40" y2="18" stroke="white" strokeWidth="1.5" />
        <line x1="32" y1="22" x2="40" y2="22" stroke="white" strokeWidth="1.5" />
        <line x1="32" y1="26" x2="37" y2="26" stroke="white" strokeWidth="1.5" />
      </svg>

      <Box
        component="span"
        sx={{
          fontSize: {
            xs: "20px",
            md: "24px",
          },
          fontWeight: 700,
          background: "linear-gradient(135deg, #2196F3 0%, #4CAF50 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.5px",
        }}
      >
        OpenConvert
      </Box>
    </Box>
  );
}

export default Logo;
