import { Stack } from "@mui/material";
import Layout from "./components/layout";
import Converter from "./features/converter/converter";
import Title from "./features/title/title";

function App() {
  return (
    <Layout>
      <Stack spacing={3}>
        <Title />
        <Converter />
      </Stack>
    </Layout>
  );
}

export default App;
