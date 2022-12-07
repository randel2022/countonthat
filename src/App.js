import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header bg-red-400">
        <img src={logo} className="App-logo" alt="logo" />
        <p>sdsdsdsd</p>
        <div className="bg-red-400">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <button className="btn btn-outline btn-success">Success</button>
        </div>
      </header>
    </div>
  );
}

export default App;
