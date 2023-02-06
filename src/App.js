import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Assets from "./components/Assets";
import Output from "./components/Output";
import Liabilities from "./components/Liabilities";
import CalculateComponent from "./components/Calculate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <div className="flex flex-col h-full md:h-auto py-0 space-between bg-white">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Main />
                  {/* <Calculate /> */}
                </>
              }
            ></Route>
            <Route
              path="/calculate"
              element={
                <>
                  {/* <Main /> */}
                  <CalculateComponent />
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
    </QueryClientProvider>
  );
}

export default App;
