import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Assets from "./components/Assets";
import Liabilities from "./components/Liabilities";
import Calculate from "./components/Calculate";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <div className="flex flex-col h-auto md:h-screen py-0 space-between">
      <Routes>
          <Route path='/' element={<><Main /></>}></Route>
          <Route path='/assets' element={<><Assets /></>}></Route>
          <Route path='/liabilities' element={<><Liabilities /></>}></Route>
       </Routes> 
      </div>
      <Footer />
    </Router>
  );
}

export default App;
