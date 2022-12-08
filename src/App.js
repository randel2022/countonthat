import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <>
      <div className="flex flex-col h-auto md:h-screen py-0 space-between">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
