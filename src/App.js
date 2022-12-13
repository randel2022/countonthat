import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Assets from "./components/Assets";
import Output from "./components/Output";
import Liabilities from "./components/Liabilities";
import Calculate from "./components/Calculate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div className="flex flex-col h-full md:h-auto py-0 space-between">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Main /> */}
                <Calculate />
              </>
            }
          ></Route>
          <Route
            path="/assets"
            element={
              <>
                <Assets />
              </>
            }
          ></Route>
          <Route
            path="/liabilities"
            element={
              <>
                <Liabilities />
              </>
            }
          ></Route>
          <Route
            path="/output"
            element={
              <>
                <Output />
              </>
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
