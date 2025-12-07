import { Stack } from "@mui/material";
import Layout from "./components/layout";
import Converter from "./features/converter/converter";
import Title from "./features/title/title";
import Values from "./features/values/values";

function App() {
  return (
    <Layout>
      <Stack spacing={3}>
        <Title />
        <Converter />
        <Values />
      </Stack>
    </Layout>
  );
}

export default App;
