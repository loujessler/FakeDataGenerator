import React from 'react';
import './App.css';
import UserGenerator from "./components/UserGenerator";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Fake Data Generator </h1>
        </header>
        <UserGenerator />
      </div>
  );
}

export default App;
