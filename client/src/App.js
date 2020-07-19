import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import AppInfo from './components/app_info/appInfo';
import { AdbProvider } from './providers/adbContext';
import ShellStream from './components/shell_stream/shellStream';

const App = props => {

  return (
    <AdbProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>

        <AppInfo />

        <div className="shell_stream container-fluid">
          <ShellStream />
        </div>
      </div >
    </AdbProvider>
  );
}

export default App;
