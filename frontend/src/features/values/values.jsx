import { Box, Container } from "@mui/material";
import { MoneyOff, SwapHoriz, Security } from "@mui/icons-material";
import ValueCard from "./value-card";

function Values() {
  const valuesData = [
    {
      icon: <MoneyOff sx={{ fontSize: 60 }} />,
      titleKey: "values.free.title",
      descriptionKey: "values.free.description",
    },
    {
      icon: <SwapHoriz sx={{ fontSize: 60 }} />,
      titleKey: "values.formats.title",
      descriptionKey: "values.formats.description",
    },
    {
      icon: <Security sx={{ fontSize: 60 }} />,
      titleKey: "values.security.title",
      descriptionKey: "values.security.description",
    },
  ];

  return (
    <Box sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {valuesData.map((value, index) => (
            <Box
              key={index}
              sx={{
                flex: { md: "1 1 0" },
                maxWidth: { md: "calc(33.333% - 16px)" },
              }}
            >
              <ValueCard
                icon={value.icon}
                titleKey={value.titleKey}
                descriptionKey={value.descriptionKey}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Values;
