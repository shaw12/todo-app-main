import React,{ useState } from "react";
import './App.css';
import Todo from './Todo';

function App() {
  const [dark, setDark] = useState(false)
  return (
    <div className="App">

      <Todo />
      
    </div>

  );
}

export default App;
