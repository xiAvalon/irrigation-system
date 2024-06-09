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



// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
// import DataDisplay from './DataDisplay';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1>Welcome to the Irrigation System</h1>
//           <Route path="/data/:date" render={({ match }) => (
//             <DataDisplay date={match.params.date} />
//           )} />
//         </header>
//       </div>
//     </Router>
//   );
// }

// export default App;
