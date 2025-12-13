import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import BlogIndex from "./pages/blog/BlogIndex";
import ATSResumeBlog from "./pages/blog/posts/ATSResumeBlog";
import PDFToWordBlog from "./pages/blog/posts/PDFToWordBlog";
import IPhoneVideoBlog from "./pages/blog/posts/IPhoneVideoBlog";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/resume-pdf-word-ats" element={<ATSResumeBlog />} />
        <Route
          path="/blog/convert-pdf-to-word-free"
          element={<PDFToWordBlog />}
        />
        <Route
          path="/blog/iphone-video-hevc-mov-windows"
          element={<IPhoneVideoBlog />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
