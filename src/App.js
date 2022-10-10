import "./App.css";

// IMPORT COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import Test from "./components/Test";
import { Route, Routes } from "react-router-dom";
// IMPORT PAGES
import Home from "./pages/Home";
import Search from "./pages/Search";
import Projects from "./pages/Projects";

function App() {
  // URL should have YOUR HEROKU URL for your backend, make sure you include the trailing slash
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/projects" element={<Projects URL={URL} />} />
        <Route path="/search" element={<Search URL={URL} />} />
      </Routes>
      <Test/>
      <Footer />
    </div>
  );
}

export default App;