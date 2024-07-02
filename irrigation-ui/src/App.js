import logo from './logo.svg';
import './App.css';
import DataDisplay from './DataDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to the Irrigation System</h1>
        <p>
          <DataDisplay />
        </p>
      </header>
    </div>
  );
}

export default App;