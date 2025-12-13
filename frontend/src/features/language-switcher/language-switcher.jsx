import { Select, MenuItem, FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={i18n.language}
        onChange={handleChange}
        sx={{
          color: "#FFD700",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFD700",
            borderWidth: "3px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFD700",
            borderWidth: "3px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFD700",
            borderWidth: "3px",
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageSwitcher;
