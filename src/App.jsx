
import './App.css'
import "@shopify/polaris/build/esm/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { AppProvider } from '@shopify/polaris';
import { Dashboard } from './components/Dashboard';

function App() {

  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App
