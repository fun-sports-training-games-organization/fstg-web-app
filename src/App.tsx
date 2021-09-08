import React from 'react';
import logo from './assets/logo512.png';
import './App.css';
import {Box, Typography} from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Box mt={5}>
          <Typography variant="h1">
              FSTG
          </Typography></Box>
      </header>
    </div>
  );
}

export default App;
