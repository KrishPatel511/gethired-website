import { Routes, Route } from "react-router-dom";
import MainLayout from "./src/components/layouts/MainLayout";
import Home from "./src/pages/Home";
import NotFound from "./src/pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Add new pages here, e.g.
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} /> */}

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
