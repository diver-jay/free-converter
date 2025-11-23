import { Stack } from "@mui/material";
import Layout from "./components/layout";
import Converter from "./features/Converter/Converter";
import HowToUse from "./features/HowToUse/HowToUse";
import FAQ from "./features/FAQ/FAQ";
import Title from "./features/Title/Title";

function App() {
  return (
    <Layout>
      <Stack spacing={3}>
        <Title />
        <Converter />
        <HowToUse />
        <FAQ />
      </Stack>
    </Layout>
  );
}

export default App;
