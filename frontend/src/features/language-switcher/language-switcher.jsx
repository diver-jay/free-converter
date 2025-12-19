import { Select, MenuItem, FormControl } from "@mui/material";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ACTION_BLUE } from "../../theme"; // ACTION_BLUE import 추가

const languages = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
];

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event) => {
    const newLocale = event.target.value;

    // Don't do anything if selecting the same locale
    if (newLocale === locale) {
      return;
    }

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={locale}
        onChange={handleChange}
        sx={{
          color: ACTION_BLUE,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: ACTION_BLUE,
            borderWidth: "3px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: ACTION_BLUE,
            borderWidth: "3px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: ACTION_BLUE,
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
