import './App.css';
import HeroComponent from './components/hero';
import BasicTabs from './components/TabComponent';
import React from "react"

function App() {
  return (
    <div className="App">
        <HeroComponent />
        <BasicTabs />
    </div>
  );
}

export default App;
