
import './App.css'
import "@shopify/polaris/build/esm/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import { AppProvider } from '@shopify/polaris';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';

function App() {

  return (
    <AppProvider>
      <></>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App
