import { Stack } from "@mui/material";
import Layout from "./components/layout";
import Converter from "./features/Converter/Converter";
import HowToUse from "./features/HowToUse/HowToUse";
import FAQ from "./features/FAQ/FAQ";

function App() {
  return (
    <Layout>
      <Stack spacing={3}>
        <Converter />
        <HowToUse />
        <FAQ />
      </Stack>
    </Layout>
  );
}

export default App;
