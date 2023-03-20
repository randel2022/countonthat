import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Headercalc from "./components/Headercalc";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Assets from "./components/Assets";
import Output from "./components/Output";
import Liabilities from "./components/Liabilities";
import CalculateComponent from "./components/Calculate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import React, { useState } from 'react'
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PasswordUpdate from "./components/PasswordUpdate";

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col h-full md:h-auto py-0 space-between bg-white">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header token={token} />
                  <Main token={token} />
                  <Footer />
                  {/* <Calculate /> */}
                </>
              }
            ></Route>
            <Route
              path="/calculate"
              element={
                 token ?
                <>                
                  <Headercalc />
                  <CalculateComponent token={token} />
                  <Footer />
                </> :
                <>
                <Header token={token} />
                <Main token={token} />
                <Footer />
                {/* <Calculate /> */}
              </>
                
              }
            ></Route>
            <Route
              path='/signin'
              element={
                <>
                  <Headercalc />
                  <SignIn setToken={setToken} />
                </>
              } />
            <Route
              path='/recover'
              element={
                <>
                  <Headercalc />
                  <ForgotPassword />
                </>
              } />

            <Route
              path='/reset/:token'
              element={
                <>
                  <Headercalc />
                  <ResetPassword />
                </>
              } />

            <Route
              path='/updated'
              element={
                <>
                  <Headercalc />
                  <PasswordUpdate />
                </>
              } />
            <Route
              path='/signup'
              element={
                <>
                  <Headercalc />
                  <SignUp />
                </>
              } />
            <Route
              path="/assets"
              element={
                <>
                  <Headercalc />
                  <Assets />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              path="/liabilities"
              element={
                <>
                  <Headercalc />
                  <Liabilities />
                  <Footer />
                </>
              }
            ></Route>
            <Route
              path="/output"
              element={
                <>
                  <Headercalc />
                  <Output />
                  <Footer />
                </>
              }
            ></Route>
          </Routes>
        </div>

      </Router>
    </QueryClientProvider>
  );
}

export default App;
