import { Stack } from "@mui/material";
import Converter from "../features/converter/converter";
import Title from "../features/title/title";
import Values from "../features/values/values";

function Home() {
  return (
    <Stack spacing={3}>
      <Title />
      <Converter />
      <Values />
    </Stack>
  );
}

export default Home;
