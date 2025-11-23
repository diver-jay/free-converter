import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";

function HowToUse() {
  const { t } = useTranslation();

  return (
    <Card elevation={4}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <PlayCircleOutline color="primary" />
            <Typography variant="h5" fontWeight="bold">
              {t("howToUse.title")}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem>
              <ListItemText
                primary={t("howToUse.step1Title")}
                secondary={t("howToUse.step1Desc")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={t("howToUse.step2Title")}
                secondary={t("howToUse.step2Desc")}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={t("howToUse.step3Title")}
                secondary={t("howToUse.step3Desc")}
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HowToUse;
