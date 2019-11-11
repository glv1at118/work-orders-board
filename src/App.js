import React from 'react';
import './styles/app.css';
import QueryPart from './components/QueryPart.jsx';
import ListPart from './components/ListPart.jsx'

function App() {
  return (
    <div id="app">
      <QueryPart></QueryPart>
      <ListPart></ListPart>
    </div>
  );
}

export default App;
