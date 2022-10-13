// IMPORT COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
// IMPORT PAGES
import Home from "./pages/Home";
import Search from "./pages/Search";
import Show from "./pages/Show";
import Test from "./pages/Test";
import Display from "./pages/Display";

function App() {
  // URL should have YOUR HEROKU URL for your backend, make sure you include the trailing slash
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/test" element={<Test URL={URL} />} />
        <Route path={`/show/:id`} element={<Show URL={URL} />} />
        <Route path="/search" element={<Search URL={URL} />} />
        <Route path={`/display/:name`} element={<Display URL={URL} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
